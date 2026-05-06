import { asyncHandler } from '../middleware/asyncHandler.js';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

const sendAuthResponse = (res, user, statusCode = 200) => {
  res.status(statusCode).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      currency: user.currency,
      avatarColor: user.avatarColor
    }
  });
};

export const register = asyncHandler(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    res.status(409);
    throw new Error('Email already registered');
  }

  const user = await User.create(req.body);
  sendAuthResponse(res, user, 201);
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.matchPassword(req.body.password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  sendAuthResponse(res, user);
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
