'use strict';
module.exports = (sequelize, DataTypes) => {
  var Activity = sequelize.define('Activity', {
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    title: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    imageName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
<<<<<<< HEAD
        Activity.belongsToMany(models.Tag, {
          through: models.ActivityTag,
        })
=======
        // Activity.belongsToMany(models.Tag, {
        //   through: models.ActivityTag,
        //   foreignKey:'ActivityId'
        //  })
>>>>>>> master
      }
    }
  });
    return Activity;
};
