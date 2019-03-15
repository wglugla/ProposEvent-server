'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        notNull: true,
        autoIncrement: true
      },
      owner_id: {
        type: DataTypes.INTEGER,
        notNull: true
      },
      place: {
        type: DataTypes.STRING(45),
        defaultValue: 'NOT KNOWN',
      },
      date: {
        type: DataTypes.DATE
      },
      description: {
        type: DataTypes.STRING(255),
        defaultValue: 'NOT KNOWN'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};