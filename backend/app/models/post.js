'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Post', {
    user_id: DataTypes.INTEGER,
    post: DataTypes.STRING,
    banner: DataTypes.STRING,
    title: DataTypes.STRING,
  });

  return User;
};