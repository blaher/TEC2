'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Nicks', 'coins', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 10
        }, {transaction: t})
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Nicks', 'coins', {transaction: t})
      ]);
    });
  }
};
