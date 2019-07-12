const fs = require('fs');
const http = require('http');
const irc = require('irc');
const path = require('path');
const sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];
var db = require(__dirname + '/models');

const network = config.network;
const user = config.user;
const channel = config.channel;

console.log('Connecting to IRC...');
var client = new irc.Client(network, user, {
    channels: [channel],
});

function seen_nick(nick) {
  db.Nick.findOrCreate({where: {nick: nick}}).then(function([dbNick, created]) {
    if (!created) {
      dbNick.seen = sequelize.fn('NOW');
      dbNick.save();
    }
  });
}

client.addListener('quit', function(quitUser) {
  if (quitUser === user) {
    client.send('NICK', user);
  }
});

client.addListener('names'+channel, function(nicks) {
  Object.keys(nicks).forEach(function(nick) {
    seen_nick(nick);
  });
});

client.addListener('join'+channel, function(nick) {
  seen_nick(nick);
});

client.addListener('message'+channel, function (from, message) {
  seen_nick(from);
  db.Nick.increment('messages', {where: {nick: from}});

  if (message.substring(0, 1) === '!') {
    var command = message.substring(1);
    if (command.indexOf(' ') >= 0) {
      command = command.substring(0, command.indexOf(' '));
    }

    var params = [];
    if (message.indexOf(' ') >= 0) {
      params = message.substring(message.indexOf(' ')+1).split(' ');
    }

    var commands = [];

    fs
      .readdirSync(__dirname + '/commands')
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      })
      .forEach(file => {
        const command = require(path.join(__dirname + '/commands', file));
        commands[file.replace('.js', '')] = command;
      });

    if (commands.indexOf(command)) {
      commands[command](client, db, channel, from, params);
    }
  }
});

client.addListener('nick', function(oldnick, newnick) {
  seen_nick(oldnick);
  seen_nick(newnick);
});

client.addListener('part'+channel, function(nick) {
  seen_nick(nick);
});

client.addListener('quit', function(nick) {
  seen_nick(nick);
});

client.addListener('kick'+channel, function(nick) {
  seen_nick(nick);
});

client.addListener('kill', function(nick) {
  seen_nick(nick);
});

client.addListener('error', function(message) {
  console.log('error: ', message);
});

// Health Check
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('The bot is running!');
  res.end();
}).listen(config.healthport);
