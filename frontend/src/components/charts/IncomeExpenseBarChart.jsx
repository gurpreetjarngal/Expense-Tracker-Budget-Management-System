import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function IncomeExpenseBarChart({ data = [] }) {
  return (
    <div className="panel p-5">
      <div className="mb-4">
        <h2 className="text-base font-extrabold">Income vs Expenses</h2>
        <p className="text-sm text-slate-500">Monthly comparison</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="income" fill="#0f766e" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expenses" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
