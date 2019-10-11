'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Nick_Stds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'unique_nick_std'
      },
      stdId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'unique_nick_std'
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
        unique_nick_std: {
          fields: ['nickId', 'stdId']
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Nick_Stds');
  }
};
