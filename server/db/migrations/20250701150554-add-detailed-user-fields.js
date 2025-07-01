'use strict';

// Asegúrate de que el path a user_model.js sea correcto
const { USER_TABLE } = require('../models/user_model'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // ===========================================
    // Campo 'role'
    // IMPORTANTE: Solo agrega esta columna si NO existía previamente en tu tabla 'users'.
    // Si ya existe 'role' en tu tabla 'users', omite este addColumn.
    // Si necesitas modificarla (ej. cambiar allowNull o defaultValue), usa changeColumn.
    // ===========================================
    await queryInterface.addColumn(USER_TABLE, 'role', {
      allowNull: true, // O 'false' si quieres que sea obligatorio
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'customer', // Valor por defecto
    });


    // Campos Planos
    await queryInterface.addColumn(USER_TABLE, 'first_name', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'last_name', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'maiden_name', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'age', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.addColumn(USER_TABLE, 'gender', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'phone', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'username', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
      unique: true, 
    });
    await queryInterface.addColumn(USER_TABLE, 'birth_date', {
      allowNull: true,
      type: Sequelize.DataTypes.DATEONLY,
    });
    await queryInterface.addColumn(USER_TABLE, 'image', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'blood_group', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'height', {
      allowNull: true,
      type: Sequelize.DataTypes.FLOAT,
    });
    await queryInterface.addColumn(USER_TABLE, 'weight', {
      allowNull: true,
      type: Sequelize.DataTypes.FLOAT,
    });
    await queryInterface.addColumn(USER_TABLE, 'eye_color', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'ip', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING, 
    });
    await queryInterface.addColumn(USER_TABLE, 'mac_address', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'university', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'ein', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'ssn', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn(USER_TABLE, 'user_agent', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING(500), 
    });

    // Campos JSONB (para PostgreSQL)
    await queryInterface.addColumn(USER_TABLE, 'hair', {
      allowNull: true,
      type: Sequelize.DataTypes.JSONB,
    });
    await queryInterface.addColumn(USER_TABLE, 'address', {
      allowNull: true,
      type: Sequelize.DataTypes.JSONB,
    });
    await queryInterface.addColumn(USER_TABLE, 'bank', {
      allowNull: true,
      type: Sequelize.DataTypes.JSONB,
    });
    await queryInterface.addColumn(USER_TABLE, 'company', {
      allowNull: true,
      type: Sequelize.DataTypes.JSONB,
    });
    await queryInterface.addColumn(USER_TABLE, 'crypto', {
      allowNull: true,
      type: Sequelize.DataTypes.JSONB,
    });

    // Si no tienes 'recovery_token' ya y lo vas a agregar en esta migración
    // await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
    //   field: 'recovery_token',
    //   allowNull: true,
    //   type: Sequelize.DataTypes.STRING
    // });
  },

  async down (queryInterface, Sequelize) {
    // En caso de querer deshacer la migración, borramos las columnas
    await queryInterface.removeColumn(USER_TABLE, 'role'); // <-- Añadido aquí
    
    await queryInterface.removeColumn(USER_TABLE, 'first_name');
    await queryInterface.removeColumn(USER_TABLE, 'last_name');
    await queryInterface.removeColumn(USER_TABLE, 'maiden_name');
    await queryInterface.removeColumn(USER_TABLE, 'age');
    await queryInterface.removeColumn(USER_TABLE, 'gender');
    await queryInterface.removeColumn(USER_TABLE, 'phone');
    await queryInterface.removeColumn(USER_TABLE, 'username');
    await queryInterface.removeColumn(USER_TABLE, 'birth_date');
    await queryInterface.removeColumn(USER_TABLE, 'image');
    await queryInterface.removeColumn(USER_TABLE, 'blood_group');
    await queryInterface.removeColumn(USER_TABLE, 'height');
    await queryInterface.removeColumn(USER_TABLE, 'weight');
    await queryInterface.removeColumn(USER_TABLE, 'eye_color');
    await queryInterface.removeColumn(USER_TABLE, 'ip');
    await queryInterface.removeColumn(USER_TABLE, 'mac_address');
    await queryInterface.removeColumn(USER_TABLE, 'university');
    await queryInterface.removeColumn(USER_TABLE, 'ein');
    await queryInterface.removeColumn(USER_TABLE, 'ssn');
    await queryInterface.removeColumn(USER_TABLE, 'user_agent');

    await queryInterface.removeColumn(USER_TABLE, 'hair');
    await queryInterface.removeColumn(USER_TABLE, 'address');
    await queryInterface.removeColumn(USER_TABLE, 'bank');
    await queryInterface.removeColumn(USER_TABLE, 'company');
    await queryInterface.removeColumn(USER_TABLE, 'crypto');

    // Si agregaste recovery_token en esta migración, también lo remueves aquí
    // await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};