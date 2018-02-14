'use strict';
module.exports = (sequelize, DataTypes) => {
  var Activity = sequelize.define('Activity', {
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    title: DataTypes.STRING,
    cost: DataTypes.STRING
  }, {
<<<<<<< HEAD
      classMethods: {
        associate: function (models) {
          Activity.belongsToMany(models.Tag, {
            through: 'ActivityTag'
          });
          sequelize.sync()
        }
=======
    classMethods: {
      associate: function(models) {
        Activity.belongsToMany(models.Tag, {
          through: models.ActivityTag,
         })
>>>>>>> master
      }
    });
  return Activity;
};