import { createSlice } from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';
import { AppError } from '../../types/errors';
import {
  build as buildBudgetsReducers,
  fetchBudgets,
} from './budgetListReducer';
import { build as buildBudgetReducers, fetchBudget } from './budgetReducer';
import {
  build as buildCategoryReducers,
  createCategory,
} from './categoryReducers';

export interface State {
  budgets: Pick<Budget, 'id'>[];
  budget: Budget | null;
  loading: boolean;
  errors: AppError[];
  taskDone: boolean;
}

const cashflowSlice = createSlice({
  name: 'cashflow',
  initialState: {
    budgets: [],
    budget: null,
    loading: false,
    errors: [],
    taskDone: false,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    buildBudgetsReducers(builder);
    buildBudgetReducers(builder);
    buildCategoryReducers(builder);
  },
});

export { fetchBudgets };
export { fetchBudget };
export { createCategory };
export default cashflowSlice.reducer;
