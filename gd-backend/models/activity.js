'use strict';
module.exports = (sequelize, DataTypes) => {
  var Activity = sequelize.define('Activity', {
    location_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    title: DataTypes.STRING,
    cost: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Activity.belongsToMany(Tag, { through:ActivityTag, foreignKey: 'activity_id' });
        Tag.belongsToMany(Activity, { through:ActivityTag, foreignKey:'tag_id' });
      }
    }
  });
  return Activity;
};
