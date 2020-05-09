import {
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  CaseReducer,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { Budget } from '../../types/budget';
import { AppError } from '../../types/errors';
import * as CashflowService from '../../services/CashflowService';
import { State } from './cashflowSlice';

const budgetsThunkPayloadCreator: AsyncThunkPayloadCreator<
  Budget[] | AppError[],
  number
> = async (args, { rejectWithValue }) => {
  try {
    const response = await CashflowService.getBudgets({ userID: args });
    return response.data as Budget[];
  } catch (e) {
    if (!e.response) {
      throw e;
    }
    return rejectWithValue(e.response.errors as AppError[]);
  }
};

type BudgetsPayloadAction =
  | ReturnType<typeof fetchBudgets.fulfilled>
  | ReturnType<typeof fetchBudgets.rejected>;

const fetchBudgets = createAsyncThunk(
  'cashflow/getBudgets',
  budgetsThunkPayloadCreator,
);

const budgetsFulfilled: CaseReducer<State, BudgetsPayloadAction> = (
  state,
  action,
) => {
  state.budgets = action.payload as Budget[];
  state.loading = false;
};

const budgetsPending: CaseReducer<State> = (state) => {
  state.loading = true;
};

const budgetsRejected: CaseReducer<State, BudgetsPayloadAction> = (
  state,
  action,
) => {
  state.budgets = [];
  state.loading = false;
  state.errors.concat(action.payload as AppError[]);
};

const build = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(fetchBudgets.fulfilled, budgetsFulfilled);
  builder.addCase(fetchBudgets.pending, budgetsPending);
  builder.addCase(fetchBudgets.rejected, budgetsRejected);
};

export { fetchBudgets, build };
