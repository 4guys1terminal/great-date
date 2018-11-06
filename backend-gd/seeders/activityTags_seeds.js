'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ActivityTags',  //Notice the plural here
    [
      {
        ActivityId: 1,
        TagId: 4,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        ActivityId: 1,
        TagId: 5,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        ActivityId: 1,
        TagId: 6,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        ActivityId: 1,
        TagId: 12,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        ActivityId: 1,
        TagId: 15,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        ActivityId: 1,
        TagId: 20,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        ActivityId: 2,
        TagId: 8,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        ActivityId: 2,
        TagId: 20,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        ActivityId: 3,
        TagId: 1,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        ActivityId: 3,
        TagId: 5,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        ActivityId: 3,
        TagId: 6,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        ActivityId: 3,
        TagId: 13,
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ActivityTags', null, {})
  }
};
