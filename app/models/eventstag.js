'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventsTag = sequelize.define('EventsTag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
  }, {
    timestamps: false
  });
  EventsTag.associate = function (models) {};
  return EventsTag;
};