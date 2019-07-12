'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Nicks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nick: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'unique_nick'
      },
      strikes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      messages: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      seen: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      uniqueKeys: {
        unique_nick: {
          fields: ['nick']
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Nicks');
  }
};
