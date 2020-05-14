import {
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  CaseReducer,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import {
  Category,
  CreateCategoryInput,
  AddEntryToCategoryInput,
  Entry,
} from '../../types/budget';
import { AppError } from '../../types/errors';
import * as CashflowService from '../../services/CashflowService';
import { State } from './cashflowSlice';
import { formatDate } from '../../utils/date';

const OPTIMISTIC_EID = -1;

const createCategoryThunkPayloadCreator: AsyncThunkPayloadCreator<
  Category | AppError[],
  CreateCategoryInput
> = async ({ budgetID, payload }, { rejectWithValue }) => {
  try {
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

const addEntryToCategoryThunkPayloadCreator: AsyncThunkPayloadCreator<
  Category | AppError[],
  AddEntryToCategoryInput
> = async ({ categoryID, payload }, { rejectWithValue }) => {
  try {
    const response = await CashflowService.addEntryToCategory({
      categoryID,
      payload,
    });
    return response.data as Entry;
  } catch (e) {
    if (!e.response) {
      throw e;
    }
    return rejectWithValue(e.response.errors as AppError[]);
  }
};

type CreateCategoryPayloadAction =
  | ReturnType<typeof createCategory.fulfilled>
  | ReturnType<typeof createCategory.rejected>;

type AddEntryToCategoryPayloadAction =
  | ReturnType<typeof addEntryToCategory.fulfilled>
  | ReturnType<typeof addEntryToCategory.pending>
  | ReturnType<typeof addEntryToCategory.rejected>;

const createCategory = createAsyncThunk(
  'cashflow/createCategory',
  createCategoryThunkPayloadCreator,
);

const addEntryToCategory = createAsyncThunk(
  'cashflow/addEntryToCategory',
  addEntryToCategoryThunkPayloadCreator,
);

const createCategoryFulfilled: CaseReducer<
  State,
  CreateCategoryPayloadAction
> = (state, action) => {
  state.budget!.categories.push(action.payload as Category);
  state.loading = false;
  state.taskDone = true;
};

const createCategoryPending: CaseReducer<State> = (state) => {
  state.loading = true;
};

const createCategoryRejected: CaseReducer<State> = (state, action) => {
  state.loading = false;
  state.taskDone = true;
  state.errors.concat(action.payload as AppError[]);
};

const addEntryToCategoryFulfilled: CaseReducer<
  State,
  AddEntryToCategoryPayloadAction
> = (state, action) => {
  const id = action.meta.arg.categoryID;
  const isExpense = action.meta.arg.payload.type === 'expense';
  const index = state.budget!.categories.findIndex((c) => c.id === id);
  if (isExpense) {
    state.budget!.categories[index].expenses.push(action.payload as Entry);
  } else {
    state.budget!.categories[index].incomes.push(action.payload as Entry);
  }
};

const addEntryToCategoryPending: CaseReducer<
  State,
  AddEntryToCategoryPayloadAction
> = (state, action) => {
  console.log('pending', action);
  // const id = Number(action.meta.arg.categoryID);
  // const entry = action.meta.arg.payload.entry as Entry;
  // entry.date = formatDate(entry.date) as any;
  // const isExpense = action.meta.arg.payload.type === 'expense';
  // const index = state.budget!.categories.findIndex((c) => c.id === id);
  // entry.id = OPTIMISTIC_EID;
  // if (isExpense) {
  //   state.budget!.categories[index].expenses.push(entry);
  // } else {
  //   state.budget!.categories[index].incomes.push(entry);
  // }
};

const addEntryToCategoryRejected: CaseReducer<
  State,
  AddEntryToCategoryPayloadAction
> = (state, action) => {
  console.log('rejected', action);
  // const id = Number(action.meta.arg.categoryID);
  // const index = state.budget!.categories.findIndex((c) => c.id === id);
  // const isExpense = action.meta.arg.payload.type === 'expense';
  // if (isExpense) {
  //   state.budget!.categories[index].expenses.pop();
  // } else {
  //   state.budget!.categories[index].incomes.pop();
  // }
  state.errors.concat(action.payload as AppError[]);
};

const build = (builder: ActionReducerMapBuilder<State>) => {
  builder.addCase(createCategory.fulfilled, createCategoryFulfilled);
  builder.addCase(createCategory.pending, createCategoryPending);
  builder.addCase(createCategory.rejected, createCategoryRejected);
  builder.addCase(addEntryToCategory.fulfilled, addEntryToCategoryFulfilled);
  builder.addCase(addEntryToCategory.pending, addEntryToCategoryPending);
  builder.addCase(addEntryToCategory.rejected, addEntryToCategoryRejected);
};

export { addEntryToCategory, createCategory, build };
