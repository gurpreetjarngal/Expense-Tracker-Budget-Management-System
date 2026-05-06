import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, tone = 'teal', trend }) {
  const tones = {
    teal: 'bg-emerald-50 text-finance-teal dark:bg-emerald-950 dark:text-emerald-200',
    blue: 'bg-blue-50 text-finance-blue dark:bg-blue-950 dark:text-blue-200',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200',
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight">{value}</p>
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-lg ${tones[tone]}`}>
          <Icon size={21} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          {trend >= 0 ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
          {Math.abs(trend)}% from last month
        </div>
      )}
    </motion.div>
  );
}
