'use strict';
module.exports = (sequelize, DataTypes) => {
  var ActivityTag = sequelize.define('ActivityTag', {
    activity_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Activity.belongsToMany(Tag, { as: 'Tags', through: { model:ActivityTag}, foreignKey: 'activity_id' });
        Tag.belongsToMany(Activity, { as: 'Activities', through: { model: ActivityTag}, foreignKey:'tag_id' });
      }
    }
  });
  return ActivityTag;
};
