'use strict';
const argon2 = require('argon2-ffi').argon2i;
const crypto = require('crypto');

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

  User.beforeCreate(async (instance) => {
    const salt = crypto.randomBytes(32);
    const hash = await argon2.hash(instance.dataValues.password, salt);
    instance.password = hash;

    return instance;
  });

  return User;
};
