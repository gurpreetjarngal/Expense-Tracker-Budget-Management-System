import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler.js';
import User from '../models/User.js';
import { getJwtSecret } from '../config/auth.js';

export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }

  const token = header.split(' ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, getJwtSecret());
  } catch {
    res.status(401);
    throw new Error('Not authorized, token invalid or expired');
  }

  req.user = await User.findById(decoded.id).select('-password');

  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, user not found');
  }

  next();
});
