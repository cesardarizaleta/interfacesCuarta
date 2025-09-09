const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(4).max(20);
const titleSize = Joi.number().integer(1);
const subtitleSize = Joi.number().integer(1);
const paragraphSize = Joi.number().integer(1);
const fontFamily = Joi.string().min(1).max(20);
const fontTitleFilePath = Joi.string().max(512);
const fontSubtitleFilePath = Joi.string().max(512);

const createFontSchema = Joi.object({
  name: name.required(),
  titleSize: titleSize.required(),
  subtitleSize: subtitleSize.required(),
  paragraphSize: paragraphSize.required(),
  fontFamily: fontFamily.required(),
  fontTitleFilePath: fontTitleFilePath.optional(),
  fontSubtitleFilePath: fontSubtitleFilePath.optional(),
});

const updateFontSchema = Joi.object({
  name,
  titleSize,
  subtitleSize,
  paragraphSize,
  fontTitleFilePath,
  fontSubtitleFilePath,
});

const getFontSchema = Joi.object({
  id
});

module.exports = { createFontSchema, updateFontSchema, getFontSchema }
