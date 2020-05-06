import {
  createSlice,
  createAsyncThunk,
  AsyncThunkPayloadCreator,
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

interface State {
  loggedUser: User | null;
  loading: boolean;
  errors: AppError[];
}

const loginUser = createAsyncThunk('users/login', loginThunkPayloadCreator);
const autologin = createAsyncThunk(
  'users/autologin',
  autologinThunkPayloadCreator,
);

const userSlice = createSlice({
  name: 'users',
  initialState: { loggedUser: null, loading: false, errors: [] } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loggedUser = action.payload as User;
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loggedUser = null;
      state.loading = false;
      state.errors.concat(action.payload as AppError[]);
    });
    builder.addCase(autologin.fulfilled, (state, action) => {
      state.loggedUser = action.payload as User;
      state.loading = false;
    });
    builder.addCase(autologin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(autologin.rejected, (state) => {
      state.loading = false;
    });
  },
});

export { loginUser, autologin };
export default userSlice.reducer;
