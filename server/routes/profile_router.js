const express = require('express');
const passport = require('passport');

const ColorsService = require('./../services/color_service');
const {getColorSchema} = require('../schemas/color_schema');

const FontsService = require('../services/font_service');
const {getFontSchema} = require('../schemas/font_schema');

const {getUserSchema} = require('../schemas/user_schema');

const validatorHandler = require('./../middlewares/validator_handler');

const router = express.Router();

const colorService = new ColorsService();
const fontService = new FontsService();

router.get('/my-colors',
    passport.authenticate('jwt', {session:false}),
    async (req, res, next) => {
    try {
        const user = req.user;
        const colors = await colorService.findByUser(user.sub);
        console.log(colors);
        res.json(colors);
    }catch (error) {
        next(error);
        }
    }
);

router.get('/my-fonts',
    passport.authenticate('jwt', {session:false}),
    async (req, res, next) => {
      try {
        const user = req.user;
        const fonts = await fontService.findByUser(user.sub);
        console.log(fonts);
        res.json(fonts);
      } catch (error) {
        next(error);
      }
    }
);


router.get('/lastColorUsed',
    passport.authenticate('jwt', {session:false}),
    async (req, res, next) => {
      try {
        const user = req.user;
        const lastColorUsed = await colorService.findLastUsedByUserId(user.sub);
        if (!lastColorUsed) {
          return res.status(404).json({ message: 'No se encontró una configuración de color reciente para este usuario.' });
        }
        res.json(lastColorUsed);
        } catch (error) {
        next(error);
      }
    }
);

router.get('/lastFontUsed',
    passport.authenticate('jwt', {session:false}),
    async (req, res, next) => {
      try {
        const user = req.user;
        const lastFontUsed = await fontService.findLastUsedByUserId(user.sub);
        if (!lastFontUsed) {
          return res.status(404).json({ message: 'No se encontró una configuración de fuente reciente para este usuario.' });
        }
        res.json(lastFontUsed);
        } catch (error) {
        next(error);
      }
    }
);

// router.get('/:id/lastColorUsed',
//     validatorHandler(getUserSchema, 'params'),
//     async (req, res, next) => {
//       try {
//         const { id } = req.params;
//         const lastColorUsed = await colorService.findLastUsedByUserId(id);
//         if (!lastColorUsed) {
//           return res.status(404).json({ message: 'No se encontró una configuración de color reciente para este usuario.' });
//         }
//         res.json(lastColorUsed);
//       } catch (error) {
//         next(error);
//       }
//     }
// );
  
router.get('/my-fonts/:id',
    passport.authenticate('jwt', {session:false}),
    validatorHandler(getFontSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const userId = req.user.sub;

            // Llama al nuevo método para buscar la fuente por su ID y verificar su pertenencia al usuario
            const font = await fontService.findOneByIdAndUserId(id, userId);

            // Si el método lanza un error (boom.notFound), será capturado por el next(error)
            res.json(font);
        }
        catch (error) {
            next(error);
        }
    }
);

router.get('/my-colors/:id',
    passport.authenticate('jwt', {session:false}),
    validatorHandler(getColorSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const userId = req.user.sub;

            // Llama al nuevo método para buscar la fuente por su ID y verificar su pertenencia al usuario
            const color = await colorService.findOneByIdAndUserId(id, userId);

            // Si el método lanza un error (boom.notFound), será capturado por el next(error)
            res.json(color);
        }
        catch (error) {
            next(error);
        }
    }
);



module.exports = router;
