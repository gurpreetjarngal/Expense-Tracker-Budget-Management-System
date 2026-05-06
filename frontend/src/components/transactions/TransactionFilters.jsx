import { Download, Search } from 'lucide-react';
import api from '../../services/api.js';
import { categories } from '../../utils/constants.js';

export default function TransactionFilters({ filters, onChange }) {
  const exportFile = async (format) => {
    const { data } = await api.get(`/transactions/export/${format}`, {
      params: filters,
      responseType: 'blob'
    });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="panel p-4">
      <div className="grid gap-3 md:grid-cols-[1fr_160px_180px_170px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            className="input pl-10"
            placeholder="Search merchant, note, category"
            value={filters.search}
            onChange={(event) => onChange({ search: event.target.value })}
          />
        </div>
        <select className="input" value={filters.type} onChange={(event) => onChange({ type: event.target.value })}>
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select className="input" value={filters.category} onChange={(event) => onChange({ category: event.target.value })}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn-secondary px-3" onClick={() => exportFile('pdf')} type="button">
            <Download size={16} /> PDF
          </button>
          <button className="btn-secondary px-3" onClick={() => exportFile('xlsx')} type="button">
            <Download size={16} /> Excel
          </button>
        </div>
      </div>
    </div>
  );
}
