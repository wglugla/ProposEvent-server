'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tags', {
      tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        notNull: true,
        autoIncrement: true
      },
      value: {
        type: DataTypes.STRING(45),
        notNull: true,
        unique: true,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tags');
  }
};