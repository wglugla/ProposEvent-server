'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersEvent = sequelize.define('UsersEvent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
  }, {
    timestamps: false
  });
  UsersEvent.associate = function (models) {

  };
  return UsersEvent;
};