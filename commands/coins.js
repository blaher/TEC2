module.exports = (client, db, channel, from, params) => {
  var nick = from;
  if (params[0]) {
    nick = params[0];
  }

  db.Nick.findOne({where: {nick: nick}}).then(function(dbNick) {
    if (dbNick) {
      if (dbNick.coins === 1) {
        client.say(channel, nick+' has '+dbNick.coins+' coin.');
      } else {
        client.say(channel, nick+' has '+dbNick.coins+' coins.');
      }
    } else {
      client.say(channel, 'Who?');
    }
  });
}
