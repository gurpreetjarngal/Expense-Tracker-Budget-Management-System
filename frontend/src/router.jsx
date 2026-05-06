import Home from './pages/home.jsx';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App.jsx';
import AuthPage from './pages/AuthPage.jsx';
import BudgetPage from './pages/BudgetPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import TransactionsPage from './pages/TransactionsPage.jsx';
import ProtectedRoute from './components/routing/ProtectedRoute.jsx';

export const router = createBrowserRouter([

  // ✅ Landing Page (Public)
  {
    path: '/',
    element: <Home />
  },

  // ✅ Auth Page
  {
    path: '/auth',
    element: <AuthPage />
  },

  // 🔐 Protected App
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'transactions', element: <TransactionsPage /> },
      { path: 'budgets', element: <BudgetPage /> },
      { path: 'reports', element: <ReportsPage /> }
    ]
  },

  { path: '*', element: <Navigate to="/" replace /> }

]);