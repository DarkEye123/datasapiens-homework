import { createSlice } from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';
import { AppError } from '../../types/errors';
import {
  build as buildBudgetsReducers,
  fetchBudgets,
} from './budgetListReducer';
import { build as buildBudgetReducers, fetchBudget } from './budgetReducer';

export interface State {
  budgets: Pick<Budget, 'id'>[];
  budget: Budget | null;
  loading: boolean;
  errors: AppError[];
}

const cashflowSlice = createSlice({
  name: 'cashflow',
  initialState: {
    budgets: [],
    budget: null,
    loading: false,
    errors: [],
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    buildBudgetsReducers(builder);
    buildBudgetReducers(builder);
  },
});

export { fetchBudgets };
export { fetchBudget };
export default cashflowSlice.reducer;
