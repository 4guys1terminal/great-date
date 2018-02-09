'use strict';
module.exports = (sequelize, DataTypes) => {
  var ActivityTag = sequelize.define('ActivityTag', {
    activity_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });
  return ActivityTag;
};
