'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Activities',  //Notice the plural here
    [
      {
        title:"Bike the boardwalk in PB then grab a drink at The Local",
        description:"Rent bikes from ____ in Pacific Beach and explore the eclectic and exciting beach scene of San Diego's Pacific Beach. Grab a bite to eat.",
        location:"Pacific Beach",
        cost:0.33,
        imageName: 'pacific_beach.jpg',
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        title:"Get your hipster game on in North Park",
        description:"Head to San Diego's hip up and coming North Park neighborhood to hang with the hipsters and Dan. If you're a fan of whiskey",
        location:"North Park",
        cost: .66,
        imageName: 'north_park.jpg',
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
      {
        title:"Grab a bottle of wine and some food and have a picnic at Sunset Cliffs",
        description:"Grab your favorite date, a bottle of your preference, and some nice cheeses/crackers.",
        location:"Sunset Cliffs",
        cost:0,
        imageName: 'sunset_cliffs.jpg',
        createdAt: new Date(), // we need to add the manually for seeds
        updatedAt: new Date()
      },
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Activities', null, {})
  }
};
