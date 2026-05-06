import express from 'express';
import {
  createTransaction,
  deleteTransaction,
  exportTransactions,
  listTransactions,
  updateTransaction
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { transactionQuerySchema, transactionSchema } from '../validators/transactionValidators.js';

const router = express.Router();

router.use(protect);
router.get('/', validate(transactionQuerySchema, 'query'), listTransactions);
router.post('/', validate(transactionSchema), createTransaction);
router.put('/:id', validate(transactionSchema), updateTransaction);
router.delete('/:id', deleteTransaction);
router.get('/export/:format', validate(transactionQuerySchema, 'query'), exportTransactions);

export default router;
