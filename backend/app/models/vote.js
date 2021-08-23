'use strict';

module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    type_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
  });

  return Vote;
};