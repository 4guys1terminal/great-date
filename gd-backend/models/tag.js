'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Tag.belongsToMany(Activity, { through: { model: ActivityTag}, foreignKey:'tag_id' });
      }
    }
  });
  return Tag;
};
