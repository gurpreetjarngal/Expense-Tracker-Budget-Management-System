import { LogOut, Menu, Moon, Search, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice.js';
import { toggleDarkMode, toggleSidebar } from '../../redux/slices/uiSlice.js';

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.ui.darkMode);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <button className="btn-secondary px-2.5 lg:hidden" onClick={() => dispatch(toggleSidebar())} aria-label="Open menu">
          <Menu size={19} />
        </button>
        <div className="relative hidden flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input className="input pl-10" placeholder="Search transactions, merchants, categories" />
        </div>
        <button className="btn-secondary px-2.5" onClick={() => dispatch(toggleDarkMode())} aria-label="Toggle theme">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-finance-teal text-sm font-bold text-white">
            {user?.name?.slice(0, 1).toUpperCase()}
          </div>
          <button className="btn-secondary px-2.5" onClick={handleLogout} aria-label="Log out">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
