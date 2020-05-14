import {
  createSlice,
  createAsyncThunk,
  AsyncThunkPayloadCreator,
  CaseReducer,
} from '@reduxjs/toolkit';
import { LoginInput } from '../../types/users';
import * as UserService from '../../services/UserService';
import { User } from '../../types/users';
import { AppError } from '../../types/errors';

const loginThunkPayloadCreator: AsyncThunkPayloadCreator<
  User | AppError[],
  LoginInput
> = async (args, { rejectWithValue }) => {
  try {
    const response = await UserService.login(args);
    return response.data as User;
  } catch (e) {
    if (!e.response) {
      throw e;
    }
    return rejectWithValue(e.response.errors as AppError[]);
  }
};

const autologinThunkPayloadCreator: AsyncThunkPayloadCreator<User | null> = async () => {
  try {
    const response = await UserService.autologin();
    return response.data as User;
  } catch (e) {
    return null;
    // if (!e.response) {
    //   throw e;
    // }
  }
};

const logoutThunkPayloadCreator = async () => {
  try {
    await UserService.logout();
  } catch (e) {
    return null;
  }
};

interface State {
  user: User | null;
  loading: boolean;
  autologinDone: boolean;
  errors: AppError[];
}

type LoginPayloadAction =
  | ReturnType<typeof loginUser.fulfilled>
  | ReturnType<typeof loginUser.rejected>;

type AutoLoginPayloadAction = ReturnType<typeof autologin.fulfilled>;

const loginUser = createAsyncThunk('users/login', loginThunkPayloadCreator);
const autologin = createAsyncThunk(
  'users/autologin',
  autologinThunkPayloadCreator,
);
const logout = createAsyncThunk('users/logout', logoutThunkPayloadCreator);

const loginFulfilled: CaseReducer<State, LoginPayloadAction> = (
  state,
  action,
) => {
  state.user = action.payload as User;
  state.loading = false;
};

const loginPending: CaseReducer<State> = (state) => {
  state.loading = true;
};

const loginRejected: CaseReducer<State, LoginPayloadAction> = (
  state,
  action,
) => {
  state.loading = false;
  state.errors.concat(action.payload as AppError[]);
};

const autologinFulfilled: CaseReducer<State, AutoLoginPayloadAction> = (
  state,
  action,
) => {
  state.user = action.payload as User;
  state.loading = false;
  state.autologinDone = true;
};

const autologinPending = loginPending;

const autologinRejected: CaseReducer<State> = (state) => {
  state.loading = false;
  state.autologinDone = true;
};

const logoutPending: CaseReducer<State> = (state) => {
  state.user = null;
  state.loading = false;
  state.errors = [];
};

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    loading: false,
    errors: [],
    autologinDone: false,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, loginFulfilled);
    builder.addCase(loginUser.pending, loginPending);
    builder.addCase(loginUser.rejected, loginRejected);
    builder.addCase(autologin.fulfilled, autologinFulfilled);
    builder.addCase(autologin.pending, autologinPending);
    builder.addCase(autologin.rejected, autologinRejected);
    builder.addCase(logout.pending, logoutPending);
  },
});

export { loginUser, autologin, logout };
export default userSlice.reducer;
