import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api.js';

export const fetchTransactions = createAsyncThunk('transactions/fetch', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/transactions', { params });
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to load transactions');
  }
});

export const saveTransaction = createAsyncThunk('transactions/save', async ({ id, values }, { rejectWithValue }) => {
  try {
    const { data } = id ? await api.put(`/transactions/${id}`, values) : await api.post('/transactions', values);
    return data.transaction;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to save transaction');
  }
});

export const removeTransaction = createAsyncThunk('transactions/remove', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/transactions/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to delete transaction');
  }
});

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    pagination: { page: 1, limit: 10, total: 0, pages: 1 },
    filters: { page: 1, limit: 10, search: '', type: '', category: '', sortBy: 'date', order: 'desc' },
    loading: false,
    saving: false,
    error: null
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload, page: action.payload.page || 1 };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.transactions;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveTransaction.pending, (state) => {
        state.saving = true;
      })
      .addCase(saveTransaction.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(saveTransaction.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  }
});

export const { setFilters } = transactionSlice.actions;
export default transactionSlice.reducer;
