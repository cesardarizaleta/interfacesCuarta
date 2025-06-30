'use strict';

const { USER_TABLE } = require('../models/user_model'); // Importa la tabla de usuario

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'customer', // Asegúrate de que los usuarios existentes obtengan este rol
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
