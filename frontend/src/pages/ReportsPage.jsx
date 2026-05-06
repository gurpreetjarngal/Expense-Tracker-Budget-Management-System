import { Download } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IncomeExpenseBarChart from '../components/charts/IncomeExpenseBarChart.jsx';
import SpendingLineChart from '../components/charts/SpendingLineChart.jsx';
import { fetchDashboard } from '../redux/slices/dashboardSlice.js';
import api from '../services/api.js';

export default function ReportsPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const exportFile = async (format) => {
    const response = await api.get(`/transactions/export/${format}`, { responseType: 'blob' });
    const url = URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `financial-report.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-finance-teal">Analytics and exports</p>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Monthly Reports</h1>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => exportFile('pdf')}>
            <Download size={17} /> PDF
          </button>
          <button className="btn-secondary" onClick={() => exportFile('xlsx')}>
            <Download size={17} /> Excel
          </button>
        </div>
      </div>
      <IncomeExpenseBarChart data={data?.monthlyFlow || []} />
      <SpendingLineChart data={data?.spendingTrend || []} />
    </div>
  );
}
