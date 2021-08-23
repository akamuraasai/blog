'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    user_id: DataTypes.INTEGER,
    post: DataTypes.STRING,
    banner: DataTypes.STRING,
    title: DataTypes.STRING,
  }, {
    timestamps: true,
    paranoid: true,
  });

  return Post;
};