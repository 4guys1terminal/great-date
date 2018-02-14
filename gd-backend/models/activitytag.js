'use strict';
module.exports = (sequelize, DataTypes) => {
  var ActivityTag = sequelize.define('ActivityTag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    ActivityId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
    }, {
    classMethods: {
      // associate: function(models) {
      //   ActivityTag.hasMany(models.Tag)
      //   ActivityTag.hasMany(models.Activity)
      // }
    }
  });
  return ActivityTag;
};