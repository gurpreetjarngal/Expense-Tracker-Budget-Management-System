import express from 'express';
import { getDashboardSummary } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, getDashboardSummary);

export default router;
