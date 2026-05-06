import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function SpendingLineChart({ data = [] }) {
  return (
    <div className="panel p-5">
      <div className="mb-4">
        <h2 className="text-base font-extrabold">Spending Trend</h2>
        <p className="text-sm text-slate-500">Daily expense movement</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} minTickGap={24} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="spending" stroke="#0f766e" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
