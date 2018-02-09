'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    title: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          Tag.belongsToMany(models.Activity, {
            through: 'ActivityTag'
          });
          sequelize.sync()
        }
      }
    });
  return Tag;
};