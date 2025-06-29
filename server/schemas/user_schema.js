const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const name = Joi.string().min(3).max(100); // <-- ¡NUEVA LÍNEA! Define el esquema para 'name'

const createUserSchema = Joi.object({
  name: name.required(), // <-- ¡MODIFICADO! 'name' ahora es requerido
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name, // Puedes incluir 'name' aquí si permites actualizarlo
  email,
  password,
});

const getUserSchema = Joi.object({
  id
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }