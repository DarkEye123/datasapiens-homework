import { createSlice } from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';
import { AppError } from '../../types/errors';
import {
  build as buildBudgetsReducers,
  fetchBudgets,
} from './budgetListReducer';
import {
  build as buildBudgetReducers,
  fetchBudget,
  createBudget,
} from './budgetReducer';
import {
  build as buildCategoryReducers,
  createCategory,
  addEntryToCategory,
} from './categoryReducers';

export interface State {
  budgets: Omit<Budget, 'categories'>[];
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

export {
  fetchBudgets,
  fetchBudget,
  createCategory,
  addEntryToCategory,
  createBudget,
};
export default cashflowSlice.reducer;
