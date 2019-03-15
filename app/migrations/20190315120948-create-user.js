'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true
      },
      username: {
        type: DataTypes.STRING(45),
        notNull: true,
        unique: true
      },
      name: {
        type: DataTypes.STRING(20),
        notNull: true
      },
      surname: {
        type: DataTypes.STRING(20),
        notNull: true
      },
      password: {
        type: DataTypes.STRING(100),
        notNull: true
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};