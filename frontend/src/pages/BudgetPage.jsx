import { Save } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudget, saveBudget } from '../redux/slices/budgetSlice.js';
import { fetchDashboard } from '../redux/slices/dashboardSlice.js';
import { expenseCategories } from '../utils/constants.js';
import { currency } from '../utils/formatters.js';

export default function BudgetPage() {
  const dispatch = useDispatch();
  const month = useMemo(() => new Date().toISOString().slice(0, 7), []);
  const { current, overview, saving } = useSelector((state) => state.budgets);
  const code = useSelector((state) => state.auth.user?.currency || 'USD');
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      month,
      monthlyLimit: 0,
      notes: '',
      categories: expenseCategories.map((category) => ({ category, limit: 0 }))
    }
  });

  useEffect(() => {
    dispatch(fetchBudget(month));
  }, [dispatch, month]);

  useEffect(() => {
    if (current) reset(current);
  }, [current, reset]);

  const submit = async (values) => {
    const payload = {
      ...values,
      monthlyLimit: Number(values.monthlyLimit),
      categories: values.categories.map((item) => ({ ...item, limit: Number(item.limit) }))
    };
    await dispatch(saveBudget(payload)).unwrap();
    dispatch(fetchBudget(payload.month));
    dispatch(fetchDashboard());
  };

  const spentPercent = overview?.monthlyLimit ? Math.min((overview.totalSpent / overview.monthlyLimit) * 100, 100) : 0;

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-semibold text-finance-teal">Plan and monitor</p>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Budget Management</h1>
      </div>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="panel p-5" onSubmit={handleSubmit(submit)}>
          <h2 className="text-base font-extrabold">Monthly Budget</h2>
          <div className="mt-5 grid gap-4">
            <label className="text-sm font-semibold">
              Month
              <input className="input mt-1" type="month" {...register('month')} />
            </label>
            <label className="text-sm font-semibold">
              Monthly Limit
              <input className="input mt-1" type="number" step="0.01" {...register('monthlyLimit')} />
            </label>
            <label className="text-sm font-semibold">
              Notes
              <textarea className="input mt-1 min-h-24" {...register('notes')} />
            </label>
          </div>
          <button className="btn-primary mt-5" disabled={saving}>
            <Save size={17} /> {saving ? 'Saving...' : 'Save Budget'}
          </button>
        </form>

        <div className="panel p-5">
          <h2 className="text-base font-extrabold">Budget vs Actual</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">Limit</p>
              <p className="text-xl font-extrabold">{currency(overview?.monthlyLimit, code)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Spent</p>
              <p className="text-xl font-extrabold">{currency(overview?.totalSpent, code)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Remaining</p>
              <p className="text-xl font-extrabold">{currency(overview?.remaining, code)}</p>
            </div>
          </div>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full rounded-full bg-finance-teal" style={{ width: `${spentPercent}%` }} />
          </div>
          {overview?.isExceeded && <p className="mt-3 text-sm font-semibold text-rose-600">Budget exceeded this month.</p>}
        </div>
      </section>

      <form className="panel p-5" onSubmit={handleSubmit(submit)}>
        <h2 className="text-base font-extrabold">Category Budgets</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {expenseCategories.map((category, index) => {
            const status = overview?.categoryStatus?.find((item) => item.category === category);
            return (
              <label key={category} className="rounded-lg border border-slate-200 p-4 text-sm font-semibold dark:border-slate-800">
                {category}
                <input type="hidden" value={category} {...register(`categories.${index}.category`)} />
                <input className="input mt-2" type="number" step="0.01" {...register(`categories.${index}.limit`)} />
                <p className="mt-2 text-xs text-slate-500">Spent {currency(status?.spent || 0, code)}</p>
              </label>
            );
          })}
        </div>
        <button className="btn-primary mt-5" disabled={saving}>
          <Save size={17} /> Save Category Budgets
        </button>
      </form>
    </div>
  );
}
