'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      },
    },
    timestamps: true,
    paranoid: true,
  });

  return User;
};
