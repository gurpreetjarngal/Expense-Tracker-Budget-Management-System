import { Outlet } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar.jsx';
import Topbar from './components/layout/Topbar.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar />
      <div className="lg:pl-72">
        <Topbar />
        <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
