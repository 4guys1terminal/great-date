'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tags',  //Notice the plural here
    [
      {
         title: 'Romantic',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Thrilling',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Morning',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Afternoon',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Evening',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Outdoors',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Indoors',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Shopping',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Food',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Nightlife',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Travel',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Athletic',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Relaxing',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Gaming',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Bars',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Music',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Art',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Crafts',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Fancy',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       },
       {
         title: 'Casual',
         createdAt: new Date(), // we need to add the manually for seeds
         updatedAt: new Date()
       }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tags', null, {})
  }
};
