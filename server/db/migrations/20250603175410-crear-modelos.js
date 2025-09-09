'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user_model')
const { FontSchema, FONT_TABLE } = require('./../models/font_model')
const { ColorSchema, COLOR_TABLE } = require('./../models/color_model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(FONT_TABLE, FontSchema);
    await queryInterface.createTable(COLOR_TABLE, ColorSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(FONT_TABLE);
    await queryInterface.dropTable(COLOR_TABLE);
  }
};
