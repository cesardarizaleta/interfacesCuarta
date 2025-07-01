// routes/auth_router.js
const express = require('express');
const passport = require('passport');
const AuthService = require('./../services/auth_service'); // Asegúrate de que esta ruta sea correcta
const boom = require('@hapi/boom'); // Para lanzar errores boom

const router = express.Router();
const authService = new AuthService();

router.post(
    '/login',
    passport.authenticate('local', { session: false }), // Primera capa: Autentica con estrategia 'local'
    async (req, res, next) => {
        try {
            const user = req.user; // Passport.js ya ha adjuntado el usuario autenticado a req.user

            // Paso clave: Valida el estado del usuario (admin o activo)
            authService.validateUserStatus(user); // Este método lanzará un error si no cumple

            // Si pasa la validación, genera el token
            const token = authService.signToken(user);
            
            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    status: user.status // Opcional: Puedes devolver el status también
                },
                token
            });
        } catch (error) {
            next(error); // Pasa cualquier error (incluido el de validación de estado) al middleware de errores
        }
    }
);

// Opcional: Ruta para re-enviar un token si tienes lógica para ello (refresh token, etc.)
// router.post('/recover',
//   async (req, res, next) => {
//     try {
//       const { email } = req.body;
//       const rta = await authService.sendRecovery(email);
//       res.json(rta);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;