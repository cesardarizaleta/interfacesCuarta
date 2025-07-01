// services/auth_service.js
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersService = require('./user_service'); // Asegúrate de que esta ruta sea correcta
const { config } = require('./../config/config'); // Asegúrate de que esta ruta sea correcta

class AuthService {
    constructor() {
        this.userService = new UsersService();
    }

    async getUser(email, password) {
        const user = await this.userService.findOneByEmail(email); // Asumiendo que tienes este método en UsersService
        if (!user) {
            throw boom.unauthorized('Invalid email or password.');
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw boom.unauthorized('Invalid email or password.');
        }
        
        // No devuelvas el password hash
        delete user.dataValues.password; 
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        };
        // Opcional: Podrías añadir la fecha de creación del token (iat) por defecto, 
        // pero jwt.sign ya lo hace.
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }); // Tiempo de expiración recomendado
        return token;
    }

    validateUserStatus(user) {
        if (user.role === 'admin') {
            // Los administradores siempre pueden iniciar sesión, independientemente de su status
            return true;
        }

        // Si no es admin, verifica su status
        if (user.status !== 'active') {
            throw boom.unauthorized('Your account is inactive. Please contact support.');
        }
        return true;
    }
}

module.exports = AuthService;