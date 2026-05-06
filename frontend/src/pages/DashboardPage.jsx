import { AlertTriangle, Banknote, CreditCard, PiggyBank, Wallet } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpensePieChart from '../components/charts/ExpensePieChart.jsx';
import IncomeExpenseBarChart from '../components/charts/IncomeExpenseBarChart.jsx';
import SpendingLineChart from '../components/charts/SpendingLineChart.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import StatCard from '../components/common/StatCard.jsx';
import { fetchDashboard } from '../redux/slices/dashboardSlice.js';
import { currency } from '../utils/formatters.js';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.dashboard);
  const code = useSelector((state) => state.auth.user?.currency || 'USD');

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading && !data) {
    return (
      <div className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-36" />)}</div>
        <Skeleton className="h-80" />
      </div>
    );
  }

  const cards = data?.cards || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-finance-teal">Financial overview</p>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Dashboard</h1>
        </div>
      </div>

      {data?.alerts?.length > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
          <AlertTriangle size={20} />
          <p className="text-sm font-semibold">{data.alerts[0]}</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Balance" value={currency(cards.totalBalance, code)} icon={Wallet} tone="teal" />
        <StatCard title="Total Income" value={currency(cards.totalIncome, code)} icon={Banknote} tone="blue" />
        <StatCard title="Total Expenses" value={currency(cards.totalExpenses, code)} icon={CreditCard} tone="rose" />
        <StatCard title="Budget Remaining" value={currency(cards.budgetRemaining, code)} icon={PiggyBank} tone="amber" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <ExpensePieChart data={data?.categoryExpenses || []} />
        <IncomeExpenseBarChart data={data?.monthlyFlow || []} />
      </div>
      <SpendingLineChart data={data?.spendingTrend || []} />
    </div>
  );
}
