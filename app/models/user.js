'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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

  }, {
    timestamps: false
  });
  User.associate = function (models) {
    User.hasMany(models.Event, {
      foreignKey: 'owner_id'
    });
    User.hasMany(models.UsersTag, {
      foreignKey: 'user_id'
    })
  };
  return User;
};