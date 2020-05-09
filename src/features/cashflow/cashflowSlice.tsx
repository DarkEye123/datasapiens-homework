import {
  createSlice,
  createAsyncThunk,
  AsyncThunkPayloadCreator,
  CaseReducer,
} from '@reduxjs/toolkit';
import * as CashflowService from '../../services/CashflowService';
import { Budget } from '../../types/budget';
import { AppError } from '../../types/errors';

const budgetsThunkPayloadCreator: AsyncThunkPayloadCreator<
  Budget[] | AppError[],
  number
> = async (args, { rejectWithValue }) => {
  try {
    const response = await CashflowService.getBudgets({ userId: args });
    return response.data as Budget[];
  } catch (e) {
    if (!e.response) {
      throw e;
    }
    return rejectWithValue(e.response.errors as AppError[]);
  }
};

interface State {
  budgets: Budget[];
  loading: boolean;
  errors: AppError[];
}

type BudgetsPayloadAction =
  | ReturnType<typeof getBudgets.fulfilled>
  | ReturnType<typeof getBudgets.rejected>;

const getBudgets = createAsyncThunk(
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

const cashflowSlice = createSlice({
  name: 'cashflow',
  initialState: {
    budgets: [],
    loading: false,
    errors: [],
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBudgets.fulfilled, budgetsFulfilled);
    builder.addCase(getBudgets.pending, budgetsPending);
    builder.addCase(getBudgets.rejected, budgetsRejected);
  },
});

export { getBudgets };
export default cashflowSlice.reducer;
