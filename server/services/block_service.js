// services/block_service.js
const boom = require('@hapi/boom');
const UsersService = require('./user_service'); // Importa tu UsersService

class BlockService {
    constructor() {
        this.userService = new UsersService(); // Instancia de UsersService para reutilizar métodos
    }

    async blockUser(userId) {
        // Primero, verifica que el usuario exista
        const user = await this.userService.findOne(userId); // Reutiliza findOne de UsersService
        if (!user) {
            throw boom.notFound('User to block not found');
        }

        // Si el usuario ya está inactivo, no hacemos nada o lanzamos un error específico
        if (user.status === 'inactive') {
            throw boom.badRequest('User is already inactive.');
        }

        // Actualiza el status del usuario a 'inactive'
        const updatedUser = await this.userService.update(userId, { status: 'inactive' });
        
        // Opcional: Puedes eliminar el password del objeto de respuesta si no quieres que se devuelva
        if (updatedUser.dataValues && updatedUser.dataValues.password) {
          delete updatedUser.dataValues.password; 
        }
        
        return updatedUser;
    }

    async unblockUser(userId) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw boom.notFound('User to unblock not found');
        }

        if (user.status === 'active') {
            throw boom.badRequest('User is already active.');
        }

        const updatedUser = await this.userService.update(userId, { status: 'active' });
        if (updatedUser.dataValues && updatedUser.dataValues.password) {
            delete updatedUser.dataValues.password;
        }
        return updatedUser;
    }

    async getUserStatus(userId) {
        const user = await this.userService.findOne(userId); // Reutiliza findOne para obtener el usuario
        if (!user) {
            throw boom.notFound('User not found.');
        }

        // Solo devuelve el ID y el status
        return {
            id: user.id,
            status: user.status
        };
    }
}

module.exports = BlockService;