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
      foreignKey: 'tag_id'
    })
  };
  return Tag;
};