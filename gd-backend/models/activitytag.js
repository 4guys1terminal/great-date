'use strict';
module.exports = (sequelize, DataTypes) => {
  var ActivityTag = sequelize.define('ActivityTag', {
    ActivityId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
      classMethods: {
        associate: function (models) {
          ActivityTag.hasMany(models.Tag)
          ActivityTag.hasMany(models.Activity)
        }
      }
    });
  return ActivityTag;
};