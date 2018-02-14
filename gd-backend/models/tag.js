'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    title: DataTypes.STRING
  }, {
<<<<<<< HEAD
      classMethods: {
        associate: function (models) {
          Tag.belongsToMany(models.Activity, {
            through: 'ActivityTag'
          });
          sequelize.sync()
        }
      }
    });
=======
    classMethods: {
      associate: function(models) {
        Tag.belongsToMany(models.Activity, {
          through: models.ActivityTag })
    }
  }
  });
>>>>>>> master
  return Tag;
};