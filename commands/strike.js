module.exports = (client, db, channel, from, params) => {
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
}
