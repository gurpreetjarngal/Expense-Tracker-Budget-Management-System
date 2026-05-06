import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionFilters from '../components/transactions/TransactionFilters.jsx';
import TransactionForm from '../components/transactions/TransactionForm.jsx';
import TransactionTable from '../components/transactions/TransactionTable.jsx';
import { fetchDashboard } from '../redux/slices/dashboardSlice.js';
import {
  fetchTransactions,
  removeTransaction,
  saveTransaction,
  setFilters
} from '../redux/slices/transactionSlice.js';

export default function TransactionsPage() {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const { items, pagination, filters, loading, saving } = useSelector((state) => state.transactions);
  const code = useSelector((state) => state.auth.user?.currency || 'USD');

  useEffect(() => {
    dispatch(fetchTransactions(filters));
  }, [dispatch, filters]);

  const submit = async (values) => {
    await dispatch(saveTransaction({ id: editing?._id, values })).unwrap();
    setEditing(null);
    dispatch(fetchTransactions(filters));
    dispatch(fetchDashboard());
  };

  const onDelete = async (id) => {
    await dispatch(removeTransaction(id)).unwrap();
    dispatch(fetchDashboard());
  };

  const updateFilters = (changes) => dispatch(setFilters(changes));

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-semibold text-finance-teal">Cash flow records</p>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Transactions</h1>
      </div>

      <TransactionForm initialValue={editing} onSubmit={submit} saving={saving} />
      <TransactionFilters filters={filters} onChange={updateFilters} />

      <section className="panel p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold">Transaction History</h2>
            <p className="text-sm text-slate-500">{pagination.total} total records</p>
          </div>
          {loading && <span className="text-sm font-semibold text-finance-teal">Loading...</span>}
        </div>
        <TransactionTable items={items} currencyCode={code} onEdit={setEditing} onDelete={onDelete} />
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            className="btn-secondary px-2.5"
            disabled={pagination.page <= 1}
            onClick={() => updateFilters({ page: pagination.page - 1 })}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-semibold">
            Page {pagination.page} of {pagination.pages || 1}
          </span>
          <button
            className="btn-secondary px-2.5"
            disabled={pagination.page >= pagination.pages}
            onClick={() => updateFilters({ page: pagination.page + 1 })}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
