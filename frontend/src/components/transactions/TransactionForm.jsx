import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar, DollarSign, Tag } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { categories } from '../../utils/constants.js';

const schema = yup.object({
  type: yup.string().oneOf(['income', 'expense']).required(),
  category: yup.string().required(),
  amount: yup.number().positive().required(),
  date: yup.string().required(),
  merchant: yup.string().max(120),
  note: yup.string().max(240)
});

export default function TransactionForm({ initialValue, onSubmit, saving }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'expense',
      category: 'Food',
      amount: '',
      date: new Date().toISOString().slice(0, 10),
      merchant: '',
      note: ''
    }
  });

  useEffect(() => {
    if (initialValue) {
      reset({ ...initialValue, date: initialValue.date?.slice(0, 10) });
    }
  }, [initialValue, reset]);

  return (
    <form className="panel p-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-base font-extrabold">{initialValue ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Type
          <select className="input mt-1" {...register('type')}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <label className="text-sm font-semibold">
          Category
          <div className="relative mt-1">
            <Tag className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <select className="input pl-10" {...register('category')}>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
        </label>
        <label className="text-sm font-semibold">
          Amount
          <div className="relative mt-1">
            <DollarSign className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input className="input pl-10" type="number" step="0.01" {...register('amount')} />
          </div>
          {errors.amount && <span className="text-xs text-rose-600">{errors.amount.message}</span>}
        </label>
        <label className="text-sm font-semibold">
          Date
          <div className="relative mt-1">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input className="input pl-10" type="date" {...register('date')} />
          </div>
        </label>
        <label className="text-sm font-semibold">
          Merchant
          <input className="input mt-1" placeholder="Amazon, Starbucks, payroll" {...register('merchant')} />
        </label>
        <label className="text-sm font-semibold">
          Note
          <input className="input mt-1" placeholder="Optional details" {...register('note')} />
        </label>
      </div>
      <button className="btn-primary mt-5" type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save Transaction'}
      </button>
    </form>
  );
}
