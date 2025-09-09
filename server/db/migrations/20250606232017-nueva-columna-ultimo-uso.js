'use strict';

const { COLOR_TABLE } = require('../models/color_model');
const { FONT_TABLE } = require('../models/font_model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(FONT_TABLE, 'last_used_at', {
      allowNull: true,
      type: Sequelize.DataTypes.DATE,
    });
    await queryInterface.addColumn(COLOR_TABLE, 'last_used_at', {
      allowNull: true,
      type: Sequelize.DataTypes.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(FONT_TABLE, 'last_used_at');
    await queryInterface.removeColumn(COLOR_TABLE, 'last_used_at');
  }
};
