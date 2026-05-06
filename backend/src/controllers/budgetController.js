import { asyncHandler } from '../middleware/asyncHandler.js';
import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';

const monthRange = (month) => {
  const [year, monthIndex] = month.split('-').map(Number);
  const start = new Date(year, monthIndex - 1, 1);
  const end = new Date(year, monthIndex, 0, 23, 59, 59, 999);
  return { start, end };
};

export const upsertBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.findOneAndUpdate(
    { user: req.user._id, month: req.body.month },
    { ...req.body, user: req.user._id },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({ budget });
});

export const getBudget = asyncHandler(async (req, res) => {
  const month = req.query.month || new Date().toISOString().slice(0, 7);
  const budget = await Budget.findOne({ user: req.user._id, month });
  const { start, end } = monthRange(month);

  const spending = await Transaction.aggregate([
    { $match: { user: req.user._id, type: 'expense', date: { $gte: start, $lte: end } } },
    { $group: { _id: '$category', spent: { $sum: '$amount' } } }
  ]);

  const spentByCategory = spending.reduce((acc, row) => {
    acc[row._id] = row.spent;
    return acc;
  }, {});

  const totalSpent = spending.reduce((sum, row) => sum + row.spent, 0);
  const monthlyLimit = budget?.monthlyLimit || 0;

  res.json({
    budget,
    overview: {
      month,
      monthlyLimit,
      totalSpent,
      remaining: Math.max(monthlyLimit - totalSpent, 0),
      isExceeded: monthlyLimit > 0 && totalSpent > monthlyLimit,
      categoryStatus: (budget?.categories || []).map((item) => ({
        category: item.category,
        limit: item.limit,
        spent: spentByCategory[item.category] || 0,
        remaining: Math.max(item.limit - (spentByCategory[item.category] || 0), 0),
        isExceeded: (spentByCategory[item.category] || 0) > item.limit
      }))
    }
  });
});

export const listBudgets = asyncHandler(async (req, res) => {
  const budgets = await Budget.find({ user: req.user._id }).sort({ month: -1 });
  res.json({ budgets });
});
