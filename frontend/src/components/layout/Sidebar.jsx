import { BarChart3, CreditCard, LayoutDashboard, PieChart, Wallet, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { closeSidebar } from '../../redux/slices/uiSlice.js';

const links = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/transactions', label: 'Transactions', icon: CreditCard },
  { to: '/app/budgets', label: 'Budgets', icon: Wallet },
  { to: '/app/reports', label: 'Reports', icon: BarChart3 }
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.sidebarOpen);

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 z-30 bg-slate-950/40 transition lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => dispatch(closeSidebar())}
      />
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white px-4 py-5 transition-transform dark:border-slate-800 dark:bg-slate-950',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-finance-teal text-white">
              <PieChart size={24} />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight">ExpenseFlow</p>
              <p className="text-xs font-medium text-slate-500">Budget manager</p>
            </div>
          </div>
          <button className="btn-secondary px-2.5 lg:hidden" onClick={() => dispatch(closeSidebar())} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="mt-8 space-y-1">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/app'}
              onClick={() => dispatch(closeSidebar())}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition',
                  isActive
                    ? 'bg-finance-mint text-finance-teal dark:bg-emerald-950 dark:text-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                )
              }
            >
              <item.icon size={19} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 rounded-lg bg-finance-sky p-4 dark:bg-slate-900">
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Monthly clarity</p>
          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
            Track spending, budgets, and category trends from one focused workspace.
          </p>
        </div>
      </aside>
    </>
  );
}
