import jwt from 'jsonwebtoken';
import { getJwtExpiresIn, getJwtSecret } from '../config/auth.js';

export const generateToken = (userId) =>
  jwt.sign({ id: userId }, getJwtSecret(), {
    expiresIn: getJwtExpiresIn()
  });
