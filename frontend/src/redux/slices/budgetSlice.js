import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api.js';

export const fetchBudget = createAsyncThunk('budgets/fetch', async (month, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/budgets', { params: { month } });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to load budget');
  }
});

export const saveBudget = createAsyncThunk('budgets/save', async (values, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/budgets', values);
    return data.budget;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to save budget');
  }
});

const budgetSlice = createSlice({
  name: 'budgets',
  initialState: {
    current: null,
    overview: null,
    loading: false,
    saving: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudget.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.budget;
        state.overview = action.payload.overview;
      })
      .addCase(fetchBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveBudget.pending, (state) => {
        state.saving = true;
      })
      .addCase(saveBudget.fulfilled, (state, action) => {
        state.saving = false;
        state.current = action.payload;
      })
      .addCase(saveBudget.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      });
  }
});

export default budgetSlice.reducer;
