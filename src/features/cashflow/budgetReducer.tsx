import {
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  CaseReducer,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { Category, Budget, CreateBudgetInput } from '../../types/budget';
import { AppError } from '../../types/errors';
import * as CashflowService from '../../services/CashflowService';
import { State } from './cashflowSlice';

const fetchBudgetThunkPayloadCreator: AsyncThunkPayloadCreator<
  Category[] | AppError[],
  number
> = async (args, { rejectWithValue }) => {
  try {
    let categories: Category[] = [];
    const response = await CashflowService.getCategories(args);
    const promises = [];
    for (const category of response.data as Category[]) {
      category.expenses = [];
      category.incomes = [];
      categories.push(category);
      promises.push(
        CashflowService.getEntriesForCategory({ categoryID: category.id }),
      );
    }
    const entries = await Promise.all(promises);
    for (const entry of entries) {
      const [expenses, incomes] = entry;
      if (expenses.data?.length || incomes.data?.length) {
        const id = expenses.data?.length
          ? expenses.data[0].categoryId
          : incomes.data![0].categoryId;
        const category = categories.find((c) => c.id === id) as Category;
        category.expenses = expenses.data || [];
        category.incomes = incomes.data || [];
      }
    }
    return categories;
  } catch (e) {
    console.log(e);
    if (!e.response) {
      throw e;
    }
    return rejectWithValue(e.response.errors as AppError[]);
  }
};

const createBudgetThunkPayloadCreator: AsyncThunkPayloadCreator<
  Budget | AppError[],
  CreateBudgetInput
> = async (args, { rejectWithValue }) => {
  try {
    const response = await CashflowService.createBudget(args);
    return response.data as Budget;
  } catch (e) {
    console.log(e);
    if (!e.response) {
      throw e;
    }
    return rejectWithValue(e.response.errors as AppError[]);
  }
};

type FetchBudgetPayloadAction =
  | ReturnType<typeof fetchBudget.fulfilled>
  | ReturnType<typeof fetchBudget.rejected>;

type CreateBudgetPayloadAction =
  | ReturnType<typeof createBudget.fulfilled>
  | ReturnType<typeof createBudget.rejected>;

const fetchBudget = createAsyncThunk(
  'cashflow/fetchBudget',
  fetchBudgetThunkPayloadCreator,
);

const createBudget = createAsyncThunk(
  'cashflow/createBudget',
  createBudgetThunkPayloadCreator,
);

const budgetFulfilled: CaseReducer<State, FetchBudgetPayloadAction> = (
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

const budgetRejected: CaseReducer<State, FetchBudgetPayloadAction> = (
  state,
  action,
) => {
  state.loading = false;
  state.errors.concat(action.payload as AppError[]);
};

const createBudgetFulfilled: CaseReducer<State, CreateBudgetPayloadAction> = (
  state,
  action,
) => {
  state.budgets.push(action.payload as Budget);
};

const build = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(fetchBudget.fulfilled, budgetFulfilled);
  builder.addCase(fetchBudget.pending, budgetPending);
  builder.addCase(fetchBudget.rejected, budgetRejected);
  builder.addCase(createBudget.fulfilled, createBudgetFulfilled);
};

export { fetchBudget, createBudget, build };
