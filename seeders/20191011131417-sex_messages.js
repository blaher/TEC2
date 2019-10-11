'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sex_Messages', [
      {
        message: 'Thank you! Come again.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'Well that was interesting...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'You remind me so much of my brother!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'The best I have ever had...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'Did you enjoy that?',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sex_Messages', null, {});
  }
};
