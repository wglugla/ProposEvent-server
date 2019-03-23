'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersTag = sequelize.define(
    'UsersTag',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        notNull: true,
      },
      tag_id: {
        type: DataTypes.INTEGER,
        notNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  UsersTag.associate = function(models) {
    // associations can be defined here
  };
  return UsersTag;
};
