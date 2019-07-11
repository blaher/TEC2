var channel = '#nintendo';

var irc = require('irc');
var client = new irc.Client('irc.chatspike.net', 'TEC2', {
    channels: [channel],
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
