import { asyncHandler } from '../middleware/asyncHandler.js';
import User from '../models/User.js';

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  Object.assign(user, req.body);
  const saved = await user.save();

  res.json({
    user: {
      id: saved._id,
      name: saved.name,
      email: saved.email,
      currency: saved.currency,
      avatarColor: saved.avatarColor
    }
  });
});
