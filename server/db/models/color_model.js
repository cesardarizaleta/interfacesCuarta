const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user_model');

const COLOR_TABLE = 'colors-settings';

const ColorSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
        model: USER_TABLE,
        key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  colorPrimary: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  colorSecondary: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  colorAccent: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  colorText: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  backgroundNeutral: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastUsedAt: {
    allowNull: true, // Será nulo hasta que se use por primera vez
    type: DataTypes.DATE,
    field: 'last_used_at',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
}

class Color extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });
    }

    static config(sequelize) {
        return {
          sequelize,
          tableName: COLOR_TABLE,
          modelName: 'Color',
          timestamps: false,
        }
    }
}
    
module.exports = { COLOR_TABLE, ColorSchema, Color };
