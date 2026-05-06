import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './redux/store.js';
import { fetchCurrentUser, logout } from './redux/slices/authSlice.js';
import { router } from './router.jsx';
import { setupApiInterceptors } from './services/api.js';
import './styles/index.css';

setupApiInterceptors({
  handleUnauthorized: () => store.dispatch(logout())
});

if (localStorage.getItem('token')) {
  store.dispatch(fetchCurrentUser());
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
