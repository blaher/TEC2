'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stds', [
      // percentage of population that has it * chance of contracting it
      {
        std: 'HPV',
        chance: 16, // 80*0.2
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        std: 'Herpes',
        chance: 1.25, // 12.5*0.1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        std: 'Gonorrhea',
        chance: 0.05157, // 0.1719*0.3
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        std: 'Chlamydia',
        chance: 0.16503, // 0.5501*0.3
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        std: 'Syphilis',
        chance: 0.00363, // 0.0121*0.3
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        std: 'Hepatitis',
        chance: 0.7, // 1*0.7
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        std: 'HIV',
        chance: 0.006722, // 0.3361*0.02
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stds', null, {});
  }
};
