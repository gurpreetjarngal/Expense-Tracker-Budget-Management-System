import express from 'express';
import { getBudget, listBudgets, upsertBudget } from '../controllers/budgetController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { budgetQuerySchema, budgetSchema } from '../validators/budgetValidators.js';

const router = express.Router();

router.use(protect);
router.get('/', validate(budgetQuerySchema, 'query'), getBudget);
router.get('/history', listBudgets);
router.post('/', validate(budgetSchema), upsertBudget);

export default router;
