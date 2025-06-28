const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Sequelize } = require('sequelize'); // ¡Importa Sequelize aquí!

class ColorsService {

  constructor(){
  }

  async create(data) {
    const user = await models.User.findByPk(data.userId);
    console.log(user);
    // Validamos que exista el user
    if (!user) {
      throw boom.notFound('User not found');
    }
    const newColor = await models.Color.create(data);
    return newColor;
  }

  async find() {
    const colors = await models.Color.findAll(
      {
        include: ['user']
      }
    );
    return colors;
  }

  async findByUser(userId){
    const colors = await models.Color.findAll({
      where: {
        userId: userId
      }
    });

    return colors
  }

  async findOne(id) {
    const color = await models.Color.findByPk(id);
    if (!color) {
      throw boom.notFound('Color not found');
    }

    await color.update({ lastUsedAt: new Date() });

    return color;
  }

  async update(id, changes) {
    const color = await this.findOne(id);
    const rta = await color.update(changes);
    return rta;
  }

  async delete(id) {
    const color = await this.findOne(id);
    await color.destroy();
    return { id };
  }

  async findLastUsedByUserId(userId) {
    const color = await models.Color.findOne({
      where: { userId: userId },
      order: [
        // Usamos sequelize.literal para una expresión SQL directa
        // Esto fuerza que el order by incluya NULLS LAST
        [Sequelize.literal('"last_used_at" DESC NULLS LAST')] 
      ],
      include: ['user']
    });
    if (!color) {
      throw boom.notFound('No se ha encontrado ninguna configuración de color reciente para este usuario.');
    }
    return color;
  }

  async findOneByIdAndUserId(colorId, userId) {
    // Busca la fuente por su ID y por el ID del usuario al que pertenece
    const color = await models.Color.findOne({
      where: {
        id: colorId,
        userId: userId
      },
      include: ['user'] // Incluir el usuario si lo necesitas
    });

    if (!color) {
      throw boom.notFound('Font not found or does not belong to the authenticated user.');
    }

    await color.update({ lastUsedAt: new Date() });

    return color;
  }
}

module.exports = ColorsService;