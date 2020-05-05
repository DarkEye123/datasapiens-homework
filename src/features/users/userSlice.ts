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

interface State {
  loggedUser: User | null;
  loading: boolean;
  errors: AppError[];
}

const loginUser = createAsyncThunk('users/login', loginThunkPayloadCreator);

const userSlice = createSlice({
  name: 'users',
  initialState: { loggedUser: null, loading: false, errors: [] } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log('FULFILLED');
      state.loggedUser = action.payload as User;
      state.loading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      console.log('PENDING');
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log('REJECTED');
      state.loggedUser = null;
      state.loading = false;
      state.errors.concat(action.payload as AppError[]);
    });
  },
});

export { loginUser };
export default userSlice.reducer;
