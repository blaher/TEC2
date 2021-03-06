module.exports = (client, db, channel, from, params) => {
  if (params[0] && params[1]) {
    var nick = params[0];
    var amount = params[1];

    db.Nick.findOne({where: {nick: from}}).then(function(dbNick) {
      if (amount > dbNick.coins) {
        client.say(channel, 'You don\'t have enough coins, '+from+'.');
        return;
      }

      db.Nick.increment('coins', {where: {nick: nick}, by: amount});
      db.Nick.decrement('coins', {where: {nick: from}, by: amount});

      if (amount == 1) {
        client.say(channel, from+' has given '+nick+' '+amount+' coin.');
      } else {
        client.say(channel, from+' has given '+nick+' '+amount+' coins.');
      }
    });
  }
}
