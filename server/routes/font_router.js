const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Asegúrate de importar fs para la función delete

const FontsService = require('./../services/font_service');
const validatorHandler = require('./../middlewares/validator_handler');
const { updateFontSchema, createFontSchema, getFontSchema } = require('./../schemas/font_schema');
const passport = require('passport');
const { checkAdminRole } = require('../middlewares/auth_handler');

const router = express.Router();
const service = new FontsService();

// --- Configuración de Multer ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/fonts/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'font/ttf' || file.originalname.endsWith('.ttf')) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no válido. Solo se permiten archivos .ttf'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});
// --- Fin de Configuración de Multer ---

router.get('/', async (req, res, next) => {
  try {
    const fonts = await service.find();
    res.json(fonts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getFontSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const font = await service.findOne(id);
      res.json(font);
    } catch (error) {
      next(error);
    }
  }
);

// --- Modificación de la ruta POST para manejar múltiples subidas de archivos ---
router.post(
  '/',
  upload.fields([
    { name: 'fontTitleFilePath', maxCount: 1 },
    { name: 'fontSubtitleFilePath', maxCount: 1 }
  ]),
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createFontSchema, 'body'),
  async (req, res, next) => {
    try {
      const bodyWithUserId = {
        ...req.body, // Todos los campos del color (name, colorPrimary, etc.)
        userId: req.user.sub // Sobreescribe o añade el userId del token
      };

      // Multer adjunta la información de los archivos subidos a req.files
      // req.files será un objeto con arrays para cada campo de archivo
      if (req.files && req.files.fontTitleFilePath && req.files.fontTitleFilePath[0]) {
        bodyWithUserId.fontTitleFilePath = path.join('uploads/fonts/', req.files.fontTitleFilePath[0].filename);
      } else {
        // Si fontTitleFilePath es requerido (como en tu modelo), lanza un error
        throw new Error('Es necesario subir el archivo de fuente para el título.');
      }

      if (req.files && req.files.fontSubtitleFilePath && req.files.fontSubtitleFilePath[0]) {
        bodyWithUserId.fontSubtitleFilePath = path.join('uploads/fonts/', req.files.fontSubtitleFilePath[0].filename);
      } else {
        // fontSubtitleFilePath es opcional, así que si no se subió, se asigna null
        bodyWithUserId.fontSubtitleFilePath = null;
      }

      const newFont = await service.create(bodyWithUserId);
      res.status(201).json(newFont);
    } catch (error) {
      next(error);
    }
  }
);
// --- Fin de Modificación de la ruta POST ---

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getFontSchema, 'params'),
  validatorHandler(updateFontSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const font = await service.update(id, body);
      res.json(font);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getFontSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
