import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).max(72).required(),
  currency: Joi.string().trim().length(3).uppercase().default('USD')
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required()
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80),
  currency: Joi.string().trim().length(3).uppercase(),
  avatarColor: Joi.string().trim().pattern(/^#([0-9a-f]{3}){1,2}$/i)
});
