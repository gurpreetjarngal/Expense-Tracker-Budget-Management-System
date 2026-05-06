export const categories = [
  'Salary',
  'Freelance',
  'Investments',
  'Food',
  'Travel',
  'Bills',
  'Shopping',
  'Health',
  'Education',
  'Entertainment',
  'Savings',
  'Other'
];

export const expenseCategories = categories.filter(
  (category) => !['Salary', 'Freelance', 'Investments'].includes(category)
);

export const chartColors = ['#0f766e', '#2563eb', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];
