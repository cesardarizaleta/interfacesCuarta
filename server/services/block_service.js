// services/block_service.js
const boom = require('@hapi/boom');
const UsersService = require('./user_service'); // Importa tu UsersService

class BlockService {
    constructor() {
        this.userService = new UsersService(); // Instancia de UsersService para reutilizar métodos
    }

    async blockUser(userId) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw boom.notFound('User to block not found');
        }

        if (user.status === 'inactive') {
            throw boom.badRequest('User is already inactive.');
        }

        const updatedUser = await this.userService.update(userId, { status: 'inactive' });
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
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw boom.notFound('User not found.');
        }

        return {
            id: user.id,
            status: user.status
        };
    }

    async findActiveUsers() {
        // Asumiendo que tu UsersService.find() puede aceptar filtros o que puedes filtrar después
        // Si tu find() puede tomar un objeto de opciones:
        const activeUsers = await this.userService.find({ status: 'active' });
        
        // Si tu find() NO puede tomar filtros (menos eficiente, pero funciona):
        // const allUsers = await this.userService.find();
        // const activeUsers = allUsers.filter(user => user.status === 'active');

        // Opcional: limpiar passwords de la respuesta
        return activeUsers.map(user => {
            if (user.dataValues && user.dataValues.password) {
                delete user.dataValues.password;
            }
            return user;
        });
    }

    async findInactiveUsers() {
        const inactiveUsers = await this.userService.find({ status: 'inactive' });

        // const allUsers = await this.userService.find();
        // const inactiveUsers = allUsers.filter(user => user.status === 'inactive');

        return inactiveUsers.map(user => {
            if (user.dataValues && user.dataValues.password) {
                delete user.dataValues.password;
            }
            return user;
        });
    }
}

module.exports = BlockService;