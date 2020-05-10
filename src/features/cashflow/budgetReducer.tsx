import {
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  CaseReducer,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { Category, Budget } from '../../types/budget';
import { AppError } from '../../types/errors';
import * as CashflowService from '../../services/CashflowService';
import { State } from './cashflowSlice';

const budgetThunkPayloadCreator: AsyncThunkPayloadCreator<
  Category[] | AppError[],
  number
> = async (args, { rejectWithValue }) => {
  try {
    let categories: Category[] = [];
    const response = await CashflowService.getCategories(args);
    const promises = [];
    for (const category of response.data!) {
      categories.push(category);
      promises.push(
        CashflowService.getEntriesForCategory({ categoryID: category.id }),
      );
    }
    const entries = await Promise.all(promises);
    for (const entry of entries) {
      const [expenses, incomes] = entry;
      const id = expenses.data
        ? expenses.data[0].categoryId
        : incomes.data![0].categoryId;
      const category = categories.find((c) => c.id === id) as Category;
      category.expenses = expenses.data || [];
      category.incomes = incomes.data || [];
    }
    return categories;
  } catch (e) {
    if (!e.response) {
      throw e;
    }
    return rejectWithValue(e.response.errors as AppError[]);
  }
};

type BudgetPayloadAction =
  | ReturnType<typeof fetchBudget.fulfilled>
  | ReturnType<typeof fetchBudget.rejected>;

const fetchBudget = createAsyncThunk(
  'cashflow/fetchBudget',
  budgetThunkPayloadCreator,
);

const budgetFulfilled: CaseReducer<State, BudgetPayloadAction> = (
  state,
  action,
) => {
  state.budget = {
    id: action.meta.arg,
    categories: action.payload as Category[],
  } as Budget;
  state.loading = false;
};

const budgetPending: CaseReducer<State> = (state) => {
  state.loading = true;
};

const budgetRejected: CaseReducer<State, BudgetPayloadAction> = (
  state,
  action,
) => {
  state.loading = false;
  state.errors.concat(action.payload as AppError[]);
};

const build = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(fetchBudget.fulfilled, budgetFulfilled);
  builder.addCase(fetchBudget.pending, budgetPending);
  builder.addCase(fetchBudget.rejected, budgetRejected);
};

export { fetchBudget, build };
