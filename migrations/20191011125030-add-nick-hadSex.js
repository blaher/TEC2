'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Nicks', 'hadSex', {
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
        queryInterface.removeColumn('Nicks', 'hadSex', {transaction: t})
      ]);
    });
  }
};
