import PDFDocument from 'pdfkit';
import XLSX from 'xlsx';
import { asyncHandler } from '../middleware/asyncHandler.js';
import Transaction from '../models/Transaction.js';

const buildQuery = (userId, query) => {
  const filters = { user: userId };
  if (query.type) filters.type = query.type;
  if (query.category) filters.category = query.category;
  if (query.startDate || query.endDate) {
    filters.date = {};
    if (query.startDate) filters.date.$gte = new Date(query.startDate);
    if (query.endDate) filters.date.$lte = new Date(query.endDate);
  }
  if (query.search) {
    filters.$or = [
      { note: { $regex: query.search, $options: 'i' } },
      { merchant: { $regex: query.search, $options: 'i' } },
      { category: { $regex: query.search, $options: 'i' } }
    ];
  }
  return filters;
};

export const listTransactions = asyncHandler(async (req, res) => {
  const { page, limit, sortBy, order } = req.query;
  const filters = buildQuery(req.user._id, req.query);
  const skip = (page - 1) * limit;
  const sort = { [sortBy]: order === 'asc' ? 1 : -1 };

  const [transactions, total] = await Promise.all([
    Transaction.find(filters).sort(sort).skip(skip).limit(limit),
    Transaction.countDocuments(filters)
  ]);

  res.json({
    transactions,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const createTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.create({ ...req.body, user: req.user._id });
  res.status(201).json({ transaction });
});

export const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction not found');
  }

  res.json({ transaction });
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction not found');
  }

  res.json({ message: 'Transaction deleted' });
});

export const exportTransactions = asyncHandler(async (req, res) => {
  const format = req.params.format;
  const transactions = await Transaction.find(buildQuery(req.user._id, req.query)).sort({ date: -1 });

  if (format === 'xlsx') {
    const rows = transactions.map((item) => ({
      Date: item.date.toISOString().slice(0, 10),
      Type: item.type,
      Category: item.category,
      Merchant: item.merchant,
      Note: item.note,
      Amount: item.amount
    }));
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', 'attachment; filename=transactions.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return res.send(buffer);
  }

  if (format === 'pdf') {
    const doc = new PDFDocument({ margin: 40 });
    res.setHeader('Content-Disposition', 'attachment; filename=transactions.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.fontSize(18).text('Expense Tracker Report', { underline: true });
    doc.moveDown();
    transactions.forEach((item) => {
      doc
        .fontSize(10)
        .text(`${item.date.toISOString().slice(0, 10)} | ${item.type} | ${item.category} | ${item.merchant || '-'} | ${item.amount}`);
    });
    doc.end();
    return;
  }

  res.status(400);
  throw new Error('Unsupported export format');
});
