'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
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
  }, {
    timestamps: false
  });
  Event.associate = function (models) {};
  return Event;
};