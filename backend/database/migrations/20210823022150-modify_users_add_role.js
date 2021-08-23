'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users', // table name
      'role', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
    );
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('Users', 'role');
  }
};
