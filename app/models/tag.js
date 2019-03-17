'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
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
  }, {
    timestamps: false
  });
  Tag.associate = function (models) {
    Tag.hasMany(models.UsersTag, {
      as: 'fk_UsersTags_Tags',
      foreignKey: 'tag_id'
    });
    Tag.hasMany(models.EventsTag, {
      as: 'fk_EventsTags_Tags',
      foreignKey: 'tag_id'
    });
  };
  return Tag;
};