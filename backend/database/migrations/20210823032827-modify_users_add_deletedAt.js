'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users', // table name
      'deletedAt', // new field name
      {
        type: Sequelize.DATE,
      },
    );
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('Users', 'deletedAt');
  }
};
