import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api.js';

const storedUser = localStorage.getItem('user');
const parseStoredUser = () => {
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

const clearStoredAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', payload);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/auth/me');
    return data.user;
  } catch (error) {
    return rejectWithValue({
      message: error.response?.data?.message || 'Session expired',
      status: error.response?.status
    });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: parseStoredUser(),
    token: localStorage.getItem('token'),
    loading: false,
    error: null
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      clearStoredAuth();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        if (action.payload?.status === 401) {
          state.user = null;
          state.token = null;
          clearStoredAuth();
        }
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
