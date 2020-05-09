import { createSlice } from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';
import { AppError } from '../../types/errors';
import { build as buildGetBudgets, fetchBudgets } from './budgetListReducer';

export interface State {
  budgets: Budget[];
  loading: boolean;
  errors: AppError[];
}

const cashflowSlice = createSlice({
  name: 'cashflow',
  initialState: {
    budgets: [],
    loading: false,
    errors: [],
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    buildGetBudgets(builder);
  },
});

export { fetchBudgets };
export default cashflowSlice.reducer;
