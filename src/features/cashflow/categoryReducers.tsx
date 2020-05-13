import {
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  CaseReducer,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { Category, CreateCategoryInput } from '../../types/budget';
import { AppError } from '../../types/errors';
import * as CashflowService from '../../services/CashflowService';
import { State } from './cashflowSlice';

const categoryThunkPayloadCreator: AsyncThunkPayloadCreator<
  Category | AppError[],
  CreateCategoryInput
> = async ({ budgetID, payload }, { rejectWithValue }) => {
  try {
    console.log('in action', budgetID, payload);
    const response = await CashflowService.createCategory({
      budgetID,
      payload,
    });
    return response.data as Category;
  } catch (e) {
    if (!e.response) {
      throw e;
    }
    return rejectWithValue(e.response.errors as AppError[]);
  }
};

type CategoryPayloadAction =
  | ReturnType<typeof createCategory.fulfilled>
  | ReturnType<typeof createCategory.rejected>;

const createCategory = createAsyncThunk(
  'cashflow/createCategory',
  categoryThunkPayloadCreator,
);

const categoryFulfilled: CaseReducer<State, CategoryPayloadAction> = (
  state,
  action,
) => {
  console.log('fullfilled', action.payload);
  const length = state.budget!.categories.length;
  state.budget!.categories[length - 1] = action.payload as Category;
  state.loading = false;
  state.taskDone = true;
};

const categoryPending: CaseReducer<State> = (state) => {
  state.loading = true;
};

const categoryRejected: CaseReducer<State> = (state, action) => {
  state.loading = false;
  state.taskDone = true;
  state.errors.concat(action.payload as AppError[]);
};

const build = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(createCategory.fulfilled, categoryFulfilled);
  builder.addCase(createCategory.pending, categoryPending);
  builder.addCase(createCategory.rejected, categoryRejected);
};

export { createCategory, build };
