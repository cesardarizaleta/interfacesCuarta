const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user_model');

const FONT_TABLE = 'fonts-settings';

const FontSchema = {
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
  titleSize: {
    field: 'title_size',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  subtitleSize: {
    field: 'subtitle_size',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  paragraphSize: {
    field: 'paragraph_size',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  fontFamily: {
    field: 'font_family',
    allowNull: false,
    type: DataTypes.STRING,
  },
  fontTitleFilePath: {
    field: 'font_title_file_path',
    allowNull: false,
    type: DataTypes.STRING(512),
  },
  fontSubtitleFilePath: {
    field: 'font_subtitle_file_path',
    allowNull: true,
    type: DataTypes.STRING(512),
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

class Font extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        });
    }

    static config(sequelize) {
        return {
          sequelize,
          tableName: FONT_TABLE,
          modelName: 'Font',
          timestamps: false,
        }
    }
}

module.exports = { FONT_TABLE, FontSchema, Font };