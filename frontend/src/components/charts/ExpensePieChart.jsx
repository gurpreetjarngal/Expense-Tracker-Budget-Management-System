import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { chartColors } from '../../utils/constants.js';

export default function ExpensePieChart({ data = [] }) {
  return (
    <div className="panel p-5">
      <div className="mb-4">
        <h2 className="text-base font-extrabold">Category Expenses</h2>
        <p className="text-sm text-slate-500">Current month breakdown</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="category" innerRadius={62} outerRadius={96} paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell key={entry.category} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
