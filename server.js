var http = require('http');
var irc = require('irc');
var sequelize = require('sequelize');

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

function collect_nick(nick) {
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
    collect_nick(nick);
  });
});

client.addListener('join'+channel, function(nick) {
  collect_nick(nick);
});

client.addListener('message'+channel, function (from, message) {
  collect_nick(from);
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

    switch(command) {
      case 'hello':
        client.say(channel, 'Hello World!');
      break;

      case 'strike':
        var nick = from;
        if (params[0]) {
          nick = params[0];
        }

        db.Nick.findOne({where: {nick: nick}}).then(function(dbNick) {
          dbNick.strikes++;
          dbNick.save();

          if (dbNick.strikes === 1) {
            client.say(channel, 'That\'s a strike, '+nick+'!');
          } else {
            client.say(channel, 'That\'s '+dbNick.strikes+' strikes, '+nick+'!');
          }
        });
      break;

      case 'rank':
        client.say(channel, 'Ranks are coming soon.');
      break;

      case 'seen':
        var nick = from;
        if (params[0]) {
          nick = params[0];
        }

        db.Nick.findOne({where: {nick: nick}}).then(function(dbNick) {
          if (dbNick) {
            client.say(channel, nick+' last seen '+dbNick.seen+'.');
          } else {
            client.say(channel, 'Who?');
          }
        });
      break;
    }
  }
});

client.addListener('nick', function(oldnick, newnick) {
  collect_nick(oldnick);
  collect_nick(newnick);
});

client.addListener('part'+channel, function(nick) {
  collect_nick(nick);
});

client.addListener('quit', function(nick) {
  collect_nick(nick);
});

client.addListener('kick'+channel, function(nick) {
  collect_nick(nick);
});

client.addListener('kill', function(nick) {
  collect_nick(nick);
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
