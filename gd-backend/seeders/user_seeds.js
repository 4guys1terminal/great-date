'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users',  //Notice the plural here
    [
      {
        firstName: 'Jordan',
        lastName: 'Dominguez',
        age: 24,
        email: 'jordanjdominguez@gmail.com',
        location: 'Pacific Beach',
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        firstName: 'Jake',
        lastName: 'Parolin',
        age: 23,
        email: 'jakeparolin@gmail.com',
        location: 'Bankers Hill',
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        firstName: 'Kevin',
        lastName: 'Truong',
        age: 30,
        email: 'ktruong@gmail.com',
        location: 'Rancho Penasquitos',
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        firstName: 'Dan',
        lastName: 'Hook',
        age: 21,
        email: 'danhook@gmail.com',
        location: 'North Park',
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
