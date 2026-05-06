import { Edit2, Trash2 } from 'lucide-react';
import EmptyState from '../common/EmptyState.jsx';
import { currency, shortDate } from '../../utils/formatters.js';

export default function TransactionTable({ items = [], currencyCode = 'USD', onEdit, onDelete }) {
  if (!items.length) return <EmptyState title="No transactions yet" message="Add income or expenses to start tracking cash flow." />;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Merchant</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-950">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                <td className="whitespace-nowrap px-4 py-3 text-slate-600 dark:text-slate-300">{shortDate(item.date)}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold">{item.merchant || item.note || 'Transaction'}</p>
                  {item.note && <p className="text-xs text-slate-500">{item.note}</p>}
                </td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">
                  <span className={item.type === 'income' ? 'text-finance-teal' : 'text-finance-blue'}>{item.type}</span>
                </td>
                <td className="px-4 py-3 text-right font-bold">{currency(item.amount, currencyCode)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="btn-secondary px-2.5" onClick={() => onEdit(item)} aria-label="Edit transaction">
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-secondary px-2.5 text-rose-600" onClick={() => onDelete(item._id)} aria-label="Delete transaction">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
