module.exports = (client, db, channel, from, params) => {
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
}
