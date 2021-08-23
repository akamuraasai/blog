'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Posts', // table name
      'deletedAt', // new field name
      {
        type: Sequelize.DATE,
      },
    );
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('Posts', 'deletedAt');
  }
};
