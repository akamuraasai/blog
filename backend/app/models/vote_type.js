'use strict';

module.exports = (sequelize, DataTypes) => {
  const VoteType = sequelize.define('VoteType', {
    name: DataTypes.STRING
  });

  return VoteType;
};