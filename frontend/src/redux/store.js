import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import budgetReducer from './slices/budgetSlice.js';
import dashboardReducer from './slices/dashboardSlice.js';
import transactionReducer from './slices/transactionSlice.js';
import uiReducer from './slices/uiSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    transactions: transactionReducer,
    budgets: budgetReducer,
    ui: uiReducer
  }
});
