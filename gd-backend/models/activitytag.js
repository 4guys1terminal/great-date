'use strict';
module.exports = (sequelize, DataTypes) => {
  var ActivityTag = sequelize.define('ActivityTag', {
<<<<<<< HEAD
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
=======
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
>>>>>>> master
  return ActivityTag;
};