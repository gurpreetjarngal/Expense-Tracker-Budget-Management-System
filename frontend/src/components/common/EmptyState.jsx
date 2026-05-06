import { FolderSearch } from 'lucide-react';

export default function EmptyState({ title = 'No data found', message = 'Try adjusting filters or adding new records.' }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-slate-300 py-12 text-center dark:border-slate-700">
      <FolderSearch className="text-slate-400" size={34} />
      <p className="mt-3 text-sm font-bold">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{message}</p>
    </div>
  );
}
