'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Locations',  //Notice the plural here
    [
      {
        name: 'Pacific Beach',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mission Beach',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ocean Beach',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Downtown',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'North Park',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'La Jolla',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Old Town',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: 'North County',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Locations', null, {})
  }
};
