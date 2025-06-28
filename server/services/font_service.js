const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class FontsService {

  constructor(){
  }
  async create(data) {
    const user = await models.User.findByPk(data.userId);
    console.log(user);
    // Validamos que exista el user
    if (!user) {
      throw boom.notFound('User not found');
    }
    const newFont = await models.Font.create(data);
    return newFont;
  }

  async find() {
    const font = await models.Font.findAll(
      {
        include: ['user']
      }
    );

    return font;
  }

  async findByUser(userId){
    const fonts = await models.Font.findAll({
      where: {
        userId: userId
      }
    });

    return fonts
  }

  async findOne(id) {
    const font = await models.Font.findByPk(id);
    if (!font) {
      throw boom.notFound('Font not found');
    }

    await font.update({ lastUsedAt: new Date() });

    return font;
  }

  async update(id, changes) {
    const font = await this.findOne(id);
    const rta = await font.update(changes);
    return rta;
  }

  async delete(id) {
    const font = await this.findOne(id);

    if (font.fontTitleFilePath) {
      const filePath = path.join(process.cwd(), font.fontTitleFilePath);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error al eliminar el archivo de fuente del título: ${filePath}`, err);
        } else {
          console.log(`Archivo de fuente del título eliminado: ${filePath}`);
        }
      });
    }

    if (font.fontSubtitleFilePath) {
      const filePath = path.join(process.cwd(), font.fontSubtitleFilePath);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error al eliminar el archivo de fuente del subtítulo: ${filePath}`, err);
        } else {
          console.log(`Archivo de fuente del subtítulo eliminado: ${filePath}`);
        }
      });
    }

    await font.destroy();
    return { id };
  }

  async findLastUsedByUserId(userId) {
    const font = await models.Font.findOne({
      where: { userId: userId },
      order: [
        // Usamos sequelize.literal para una expresión SQL directa
        // Esto fuerza que el order by incluya NULLS LAST
        [Sequelize.literal('"last_used_at" DESC NULLS LAST')] 
      ],
      include: ['user']
    });
    if (!font) {
      throw boom.notFound('No se ha encontrado ninguna configuración de fuente reciente para este usuario.');
    }
    return font;
  }

  async findOneByIdAndUserId(fontId, userId) {
    // Busca la fuente por su ID y por el ID del usuario al que pertenece
    const font = await models.Font.findOne({
      where: {
        id: fontId,
        userId: userId
      },
      include: ['user'] // Incluir el usuario si lo necesitas
    });

    if (!font) {
      throw boom.notFound('Font not found or does not belong to the authenticated user.');
    }

    // Marca la fuente como "última usada" al consultarla
    await font.update({ lastUsedAt: new Date() });

    return font;
  }

}

module.exports = FontsService;
