'use strict';
module.exports = (sequelize, DataTypes) => {
    var Location = sequelize.define('Location', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Location;
};
