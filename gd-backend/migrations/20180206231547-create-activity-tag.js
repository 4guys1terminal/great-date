'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ActivityTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ActivityId: {
        type: Sequelize.INTEGER,
        references: { model: 'Activities', key: 'id' },
        onDelete: 'CASCADE'
      },
      TagId: {
      type: Sequelize.INTEGER,
      references: { model: 'Tags', key: 'id' },
      onDelete: 'CASCADE'
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ActivityTags');
  }
};
