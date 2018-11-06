'use strict';
module.exports = (sequelize, DataTypes) => {
  var Activity = sequelize.define('Activity', {
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    title: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    imageName: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function() {

      }
    }
  });
    return Activity;
};
