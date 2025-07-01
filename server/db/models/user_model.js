// user_model.js
const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  // Asumiendo que 'role' ya lo tienes o lo quieres aquí
  role: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  // ===========================================
  // Nuevos campos planos de tu JSON de ejemplo
  // ===========================================
  firstName: {
    field: 'first_name', // Convención snake_case para la DB
    allowNull: true, 
    type: DataTypes.STRING,
  },
  lastName: {
    field: 'last_name',
    allowNull: true,
    type: DataTypes.STRING,
  },
  maidenName: {
    field: 'maiden_name',
    allowNull: true,
    type: DataTypes.STRING,
  },
  age: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  gender: {
    allowNull: true,
    type: DataTypes.STRING, 
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  username: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true, 
  },
  birthDate: {
    field: 'birth_date',
    allowNull: true,
    type: DataTypes.DATEONLY, 
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING, 
  },
  bloodGroup: {
    field: 'blood_group',
    allowNull: true,
    type: DataTypes.STRING,
  },
  height: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  weight: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  eyeColor: {
    field: 'eye_color',
    allowNull: true,
    type: DataTypes.STRING,
  },
  ip: {
    allowNull: true,
    type: DataTypes.STRING, 
  },
  macAddress: {
    field: 'mac_address',
    allowNull: true,
    type: DataTypes.STRING,
  },
  university: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ein: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ssn: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  userAgent: {
    field: 'user_agent',
    allowNull: true,
    type: DataTypes.STRING(500), 
  },

  // ===========================================
  // Campos anidados como JSONB
  // ===========================================
  hair: {
    allowNull: true,
    type: DataTypes.JSONB, 
  },
  address: {
    allowNull: true,
    type: DataTypes.JSONB, 
  },
  bank: {
    allowNull: true,
    type: DataTypes.JSONB, 
  },
  company: {
    allowNull: true,
    type: DataTypes.JSONB, 
  },
  crypto: {
    allowNull: true,
    type: DataTypes.JSONB, 
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.Font, {
        as: 'fonts', // Usar plural para asociaciones de 'hasMany'
        foreignKey: 'userId'
    });
    this.hasMany(models.Color, {
        as: 'colors', // Usar plural para asociaciones de 'hasMany'
        foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      underscored: true, // Esto es importante para que Sequelize mapee camelCase a snake_case automáticamente
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User };