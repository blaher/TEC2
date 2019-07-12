const fs = require('fs');

module.exports = {
  development: {
    username: process.env.TEC_DB_USER,
    password: process.env.TEC_DB_PASS,
    database: process.env.TEC_DB,
    host: process.env.TEC_DB_HOST,
    dialect: 'mysql',
    network: 'irc.chatspike.net',
    user: 'TEC2-dev',
    channel: '#gods',
    healthport: 8082
  },
  test: {
    username: process.env.TEC_DB_USER,
    password: process.env.TEC_DB_PASS,
    database: process.env.TEC_DB,
    host: process.env.TEC_DB_HOST,
    dialect: 'mysql',
    network: 'irc.chatspike.net',
    user: 'TEC2-test',
    channel: '#gods',
    healthport: 8083
  },
  production: {
    username: process.env.TEC_DB_USER,
    password: process.env.TEC_DB_PASS,
    database: process.env.TEC_DB,
    host: process.env.TEC_DB_HOST,
    dialect: 'mysql',
    network: 'irc.chatspike.net',
    user: 'TEC2',
    channel: '#nintendo',
    healthport: 80
  }
};
