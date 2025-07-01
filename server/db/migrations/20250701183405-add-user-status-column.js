'use strict';

const { USER_TABLE } = require('../models/user_model'); // Asegúrate de que el path sea correcto

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'status', {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'active', // Importante para que los registros existentes tengan un valor por defecto
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'status');
  }
};