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
    channel: '#gods'
  },
  test: {
    username: process.env.TEC_DB_USER,
    password: process.env.TEC_DB_PASS,
    database: process.env.TEC_DB,
    host: process.env.TEC_DB_HOST,
    dialect: 'mysql',
    network: 'irc.chatspike.net',
    user: 'TEC2-test',
    channel: '#gods'
  },
  production: {
    username: process.env.TEC_DB_USER,
    password: process.env.TEC_DB_PASS,
    database: process.env.TEC_DB,
    host: process.env.TEC_DB_HOST,
    dialect: 'mysql',
    network: 'irc.chatspike.net',
    user: 'TEC2',
    channel: '#nintendo'
  }
};
