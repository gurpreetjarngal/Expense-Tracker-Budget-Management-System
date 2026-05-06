import Joi from 'joi';
import { CATEGORIES } from '../config/constants.js';

export const budgetSchema = Joi.object({
  month: Joi.string().pattern(/^\d{4}-\d{2}$/).required(),
  monthlyLimit: Joi.number().min(0).precision(2).required(),
  categories: Joi.array()
    .items(
      Joi.object({
        category: Joi.string().valid(...CATEGORIES).required(),
        limit: Joi.number().min(0).precision(2).required()
      })
    )
    .default([]),
  notes: Joi.string().trim().max(240).allow('').default('')
});

export const budgetQuerySchema = Joi.object({
  month: Joi.string().pattern(/^\d{4}-\d{2}$/)
});
