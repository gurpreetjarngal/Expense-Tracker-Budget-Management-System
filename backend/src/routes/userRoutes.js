import express from 'express';
import { updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { updateProfileSchema } from '../validators/authValidators.js';

const router = express.Router();

router.put('/profile', protect, validate(updateProfileSchema), updateProfile);

export default router;
