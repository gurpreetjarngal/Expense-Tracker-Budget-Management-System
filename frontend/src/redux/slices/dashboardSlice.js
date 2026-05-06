import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api.js';

export const fetchDashboard = createAsyncThunk('dashboard/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/reports/dashboard');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to load dashboard');
  }
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default dashboardSlice.reducer;
