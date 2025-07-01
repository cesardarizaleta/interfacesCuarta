// routes/block_router.js
const express = require('express');
const passport = require('passport'); // Para la autenticación JWT
const validatorHandler = require('./../middlewares/validator_handler'); // Para la validación de esquemas
const { getUserSchema } = require('./../schemas/user_schema'); // Para validar el ID del usuario a bloquear/desbloquear
const { checkAdminRole } = require('./../middlewares/auth_handler'); // Para la autorización de admin

const BlockService = require('./../services/block_service'); // Importa el nuevo BlockService

const router = express.Router();
const blockService = new BlockService(); // Instancia del BlockService

router.patch(
    '/:id/block', // Ruta para bloquear un usuario por su ID
    passport.authenticate('jwt', { session: false }), // Requiere autenticación JWT
    checkAdminRole, // Solo usuarios con rol 'admin' pueden acceder
    validatorHandler(getUserSchema, 'params'), // Valida que el ID en los parámetros sea un número
    async (req, res, next) => {
        try {
            const { id } = req.params; // Obtiene el ID del usuario a bloquear
            const updatedUser = await blockService.blockUser(id); // Llama al servicio para bloquear
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
);

router.patch(
    '/:id/unblock', // Ruta para desbloquear un usuario por su ID
    passport.authenticate('jwt', { session: false }), // Requiere autenticación JWT
    checkAdminRole, // Solo usuarios con rol 'admin' pueden acceder
    validatorHandler(getUserSchema, 'params'), // Valida que el ID en los parámetros sea un número
    async (req, res, next) => {
        try {
            const { id } = req.params; // Obtiene el ID del usuario a desbloquear
            const updatedUser = await blockService.unblockUser(id); // Llama al servicio para desbloquear
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/status/:id', // Ruta para obtener el status de un usuario por su ID
    passport.authenticate('jwt', { session: false }), // Requiere autenticación JWT
    // NOTA: No se requiere checkAdminRole aquí, cualquier usuario autenticado puede consultar el status de otros (o de sí mismo)
    validatorHandler(getUserSchema, 'params'), // Valida que el ID en los parámetros sea un número
    async (req, res, next) => {
        try {
            const { id } = req.params; // Obtiene el ID del usuario a verificar
            const userStatus = await blockService.getUserStatus(id); // Llama al servicio para obtener el status
            res.json(userStatus);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/active', // Ruta para obtener usuarios activos
    passport.authenticate('jwt', { session: false }), // Requiere autenticación JWT
    checkAdminRole, // Solo administradores pueden ver esta lista
    async (req, res, next) => {
        try {
            const activeUsers = await blockService.findActiveUsers(); // Llama al servicio
            res.json(activeUsers);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/inactive',
    passport.authenticate('jwt', { session: false }),
    checkAdminRole,
    async (req, res, next) => {
        try {
            const inactiveUsers = await blockService.findInactiveUsers();
            res.json(inactiveUsers);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;