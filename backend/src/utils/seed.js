import dotenv from 'dotenv';
import { subDays } from 'date-fns';
import { connectDB } from '../config/db.js';
import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

dotenv.config();

const run = async () => {
  await connectDB();
  await Promise.all([User.deleteMany({ email: 'demo@fintrack.com' })]);

  const user = await User.create({
    name: 'Demo User',
    email: 'demo@fintrack.com',
    password: 'password123',
    currency: 'USD'
  });

  const transactions = [
    ['income', 'Salary', 5200, 1, 'Company Payroll'],
    ['income', 'Freelance', 850, 8, 'Design project'],
    ['expense', 'Food', 420, 2, 'Groceries'],
    ['expense', 'Travel', 160, 4, 'Fuel and metro'],
    ['expense', 'Bills', 920, 5, 'Rent and utilities'],
    ['expense', 'Shopping', 280, 7, 'Office gear'],
    ['expense', 'Health', 120, 11, 'Pharmacy'],
    ['expense', 'Entertainment', 95, 13, 'Streaming and movies']
  ].map(([type, category, amount, days, merchant]) => ({
    user: user._id,
    type,
    category,
    amount,
    merchant,
    date: subDays(new Date(), days),
    note: `${category} sample`
  }));

  await Transaction.insertMany(transactions);
  await Budget.create({
    user: user._id,
    month: new Date().toISOString().slice(0, 7),
    monthlyLimit: 2500,
    categories: [
      { category: 'Food', limit: 550 },
      { category: 'Travel', limit: 300 },
      { category: 'Bills', limit: 1000 },
      { category: 'Shopping', limit: 350 },
      { category: 'Health', limit: 200 },
      { category: 'Entertainment', limit: 150 }
    ]
  });

  console.log('Seed complete: demo@fintrack.com / password123');
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
