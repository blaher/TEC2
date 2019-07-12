var http = require('http');
var irc = require('irc');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];

const network = config.network;
const user = config.user;
const channel = config.channel;

var client = new irc.Client(network, user, {
    channels: [channel],
});

client.addListener('quit', function(quitUser) {
  if (quitUser === user) {
    client.send('NICK', user);
  }
});

client.addListener('message'+channel, function (from, message) {
  if (message.substring(0, 1) === '!') {
    var command = message.substring(1);
    if (command.indexOf(' ') >= 0) {
      command = command.substring(0, command.indexOf(' '));
    }

    switch(command) {
      case 'hello':
        client.say(channel, 'Hello World!');
      break;

      case 'strike':
        client.say(channel, 'That\'s a strike, '+message.substring(message.indexOf(' ')+1)+'!');
      break;

      case 'rank':
        client.say(channel, 'Ranks are coming soon.');
      break;

      case 'seen':
        client.say(channel, 'Who?');
      break;
    }
  }
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
