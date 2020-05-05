import { combineReducers } from 'redux';
import usersReducer from './users/userSlice';
export { default as usersReducer } from './users/userSlice';

const rootReducer = combineReducers({
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
