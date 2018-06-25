'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Activities',  //Notice the plural here
    [
      {
        title:'"The Local" Bike Ride Along Mission Bay',
        description:"Rent Bikes at the nearby Pacific Beach Bike shop (1277 Garnet Ave) before heading down to Mission Bay. Take in the beautiful views at sunset as you ride along the bike path. Next, cross over to the San Diego boardwalk on San Rafael St. Head north up through the character-filled area and stop at The Local Pacific Beach (809 Thomas Ave) for a post-bike ride bite and a local IPA. Ahh, drink it in…",
        cost:0.33,
        imageName: 'https://s3-us-west-1.amazonaws.com/great-date/pacific_beach.jpg',
        status: "approved",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:"Get your hipster gamer on in North Park",
        description:"Head to San Diego's hip up and coming North Park neighborhood to hang with the hipsters. If you're a fan of whiskey, head to 7 Grand, where you can indulge in a full bar fit for any whiskey-lovers tastes. Check out the 'hidden' speakeasy in the back for a more 1920's experience. Finally, grab your date and head to CoinOp, a nearby arcade bar where you can enjoy their selection of drinks while playing your favorite retro arcade game, or saving your date from a zombie apocalypse!",
        location:"North Park",
        cost: .66,
        imageName: 'https://s3-us-west-1.amazonaws.com/great-date/north_park.jpg',
        status: "approved",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:"Grab a bottle of wine and some food and have a picnic at Sunset Cliffs",
        description:"Grab your favorite date, a bottle of your preference, and some nice cheeses/crackers. Head to Sunset Cliffs in the South Point Loma/Ocean Beach area to enjoy breathtaking views of the Pacific and some of the best sunsets in San Diego. If you're lucky, you may even catch a cliff diver or two taking the thrilling hop into the waters below. Be careful!",
        location:"Sunset Cliffs",
        cost:0,
        imageName: 'https://s3-us-west-1.amazonaws.com/great-date/sunset_cliffs.jpg',
        status: "approved",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Activities', null, {})
  }
};
