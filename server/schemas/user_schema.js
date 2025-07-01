// schemas/user_schema.js
const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8); // Mínimo 8 caracteres para contraseñas

// Campos planos
const firstName = Joi.string().min(2).max(50);
const lastName = Joi.string().min(2).max(50);
const maidenName = Joi.string().min(2).max(50);
const age = Joi.number().integer().min(0).max(150);
const gender = Joi.string().valid('male', 'female', 'other'); // Ejemplo de ENUM
const phone = Joi.string().pattern(/^\+\d{1,3}\s?\d{4,14}$/); // Patrón para números de teléfono internacionales
const username = Joi.string().alphanum().min(3).max(30); // Alfanumérico, entre 3 y 30 caracteres
const birthDate = Joi.date();
const image = Joi.string().uri(); // URL válida
const bloodGroup = Joi.string().length(2).pattern(/^(A|B|AB|O)[+-]$/i); // Ej: O+, AB-
const height = Joi.number().positive();
const weight = Joi.number().positive();
const eyeColor = Joi.string().min(3).max(20);
const ip = Joi.string().ip({ version: ['ipv4', 'ipv6'] });
const macAddress = Joi.string().pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/);
const university = Joi.string().min(3);
const ein = Joi.string().pattern(/^\d{3}-\d{7}$/); // Ejemplo de formato EIN
const ssn = Joi.string().pattern(/^\d{3}-\d{2}-\d{4}$/); // Ejemplo de formato SSN
const userAgent = Joi.string().max(500); // Para cadenas de User-Agent, pueden ser muy largas
const role = Joi.string().valid('admin', 'customer', 'supplier', 'guest'); // ¡Ajusta tus roles aquí!

// Campos anidados como objetos Joi
const hairSchema = Joi.object({
  color: Joi.string().optional(),
  type: Joi.string().optional(),
}).optional();

const coordinatesSchema = Joi.object({
  lat: Joi.number().optional(),
  lng: Joi.number().optional(),
}).optional();

const addressSchema = Joi.object({
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  stateCode: Joi.string().optional(),
  postalCode: Joi.string().optional(),
  coordinates: coordinatesSchema,
  country: Joi.string().optional(),
}).optional();

const bankSchema = Joi.object({
  cardExpire: Joi.string().pattern(/^\d{2}\/\d{2}$/).optional(), // MM/YY
  cardNumber: Joi.string().pattern(/^\d{13,19}$/).optional(), // Rango común de números de tarjeta
  cardType: Joi.string().optional(),
  currency: Joi.string().length(3).uppercase().optional(), // Ej: USD, EUR
  iban: Joi.string().alphanum().min(15).max(34).optional(), // Formato IBAN
}).optional();

const companySchema = Joi.object({
  department: Joi.string().optional(),
  name: Joi.string().optional(),
  title: Joi.string().optional(),
  address: addressSchema, // Puede ser otra instancia de addressSchema si la dirección de la compañía es diferente
}).optional();

const cryptoSchema = Joi.object({
  coin: Joi.string().optional(),
  wallet: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).optional(), // Ejemplo para direcciones Ethereum
  network: Joi.string().optional(),
}).optional();


// ===============================================
// Esquemas principales de validación de usuario
// ===============================================

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  username: username.required(), // Usuario debe tener un username al crearse
  role: role.optional(), // O .required() si el rol es obligatorio al crear
  
  // Campos planos
  firstName: firstName.optional(),
  lastName: lastName.optional(),
  maidenName: maidenName.optional(),
  age: age.optional(),
  gender: gender.optional(),
  phone: phone.optional(),
  birthDate: birthDate.optional(),
  image: image.optional(),
  bloodGroup: bloodGroup.optional(),
  height: height.optional(),
  weight: weight.optional(),
  eyeColor: eyeColor.optional(),
  ip: ip.optional(),
  macAddress: macAddress.optional(),
  university: university.optional(),
  ein: ein.optional(),
  ssn: ssn.optional(),
  userAgent: userAgent.optional(),

  // Campos anidados
  hair: hairSchema,
  address: addressSchema,
  bank: bankSchema,
  company: companySchema,
  crypto: cryptoSchema,
});

const updateUserSchema = Joi.object({
  email: email.optional(), // Email puede ser opcional al actualizar
  password: password.optional(), // Password puede ser opcional al actualizar
  username: username.optional(),
  role: role.optional(),
  
  // Campos planos
  firstName: firstName.optional(),
  lastName: lastName.optional(),
  maidenName: maidenName.optional(),
  age: age.optional(),
  gender: gender.optional(),
  phone: phone.optional(),
  birthDate: birthDate.optional(),
  image: image.optional(),
  bloodGroup: bloodGroup.optional(),
  height: height.optional(),
  weight: weight.optional(),
  eyeColor: eyeColor.optional(),
  ip: ip.optional(),
  macAddress: macAddress.optional(),
  university: university.optional(),
  ein: ein.optional(),
  ssn: ssn.optional(),
  userAgent: userAgent.optional(),

  // Campos anidados
  hair: hairSchema,
  address: addressSchema,
  bank: bankSchema,
  company: companySchema,
  crypto: cryptoSchema,
});

const getUserSchema = Joi.object({
  id: id.required() // El ID siempre es requerido para obtener un usuario específico
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };