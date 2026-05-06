import Joi from 'joi';
import { CATEGORIES, TRANSACTION_TYPES } from '../config/constants.js';

export const transactionSchema = Joi.object({
  type: Joi.string().valid(...TRANSACTION_TYPES).required(),
  category: Joi.string().valid(...CATEGORIES).required(),
  amount: Joi.number().positive().precision(2).required(),
  date: Joi.date().required(),
  note: Joi.string().trim().max(240).allow('').default(''),
  merchant: Joi.string().trim().max(120).allow('').default('')
});

export const transactionQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  type: Joi.string().valid(...TRANSACTION_TYPES).allow(''),
  category: Joi.string().valid(...CATEGORIES).allow(''),
  search: Joi.string().trim().allow(''),
  startDate: Joi.date(),
  endDate: Joi.date(),
  sortBy: Joi.string().valid('date', 'amount', 'category', 'type', 'createdAt').default('date'),
  order: Joi.string().valid('asc', 'desc').default('desc')
});
