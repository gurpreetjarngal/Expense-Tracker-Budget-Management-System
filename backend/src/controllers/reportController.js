import { subMonths, startOfMonth, endOfMonth, format } from 'date-fns';
import { asyncHandler } from '../middleware/asyncHandler.js';
import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const now = new Date();
  const month = format(now, 'yyyy-MM');
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const [totals, categoryExpenses, monthlyFlow, trend, budget] = await Promise.all([
    Transaction.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]),
    Transaction.aggregate([
      { $match: { user: req.user._id, type: 'expense', date: { $gte: monthStart, $lte: monthEnd } } },
      { $group: { _id: '$category', value: { $sum: '$amount' } } },
      { $sort: { value: -1 } }
    ]),
    Transaction.aggregate([
      { $match: { user: req.user._id, date: { $gte: startOfMonth(subMonths(now, 5)), $lte: monthEnd } } },
      {
        $group: {
          _id: { month: { $dateToString: { format: '%Y-%m', date: '$date' } }, type: '$type' },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.month': 1 } }
    ]),
    Transaction.aggregate([
      { $match: { user: req.user._id, type: 'expense', date: { $gte: startOfMonth(subMonths(now, 5)), $lte: monthEnd } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          spending: { $sum: '$amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    Budget.findOne({ user: req.user._id, month })
  ]);

  const income = totals.find((row) => row._id === 'income')?.total || 0;
  const expenses = totals.find((row) => row._id === 'expense')?.total || 0;
  const monthlyMap = new Map();
  monthlyFlow.forEach((row) => {
    const key = row._id.month;
    monthlyMap.set(key, { month: key, income: monthlyMap.get(key)?.income || 0, expenses: monthlyMap.get(key)?.expenses || 0 });
    monthlyMap.get(key)[row._id.type === 'income' ? 'income' : 'expenses'] = row.total;
  });

  const currentMonthExpenses = categoryExpenses.reduce((sum, row) => sum + row.value, 0);

  res.json({
    cards: {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses,
      budgetLimit: budget?.monthlyLimit || 0,
      budgetRemaining: Math.max((budget?.monthlyLimit || 0) - currentMonthExpenses, 0)
    },
    categoryExpenses: categoryExpenses.map((row) => ({ category: row._id, value: row.value })),
    monthlyFlow: Array.from(monthlyMap.values()),
    spendingTrend: trend.map((row) => ({ date: row._id, spending: row.spending })),
    alerts: budget?.monthlyLimit && currentMonthExpenses > budget.monthlyLimit
      ? [`Monthly budget exceeded by ${(currentMonthExpenses - budget.monthlyLimit).toFixed(2)}`]
      : []
  });
});
