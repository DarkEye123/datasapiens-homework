import { combineReducers } from 'redux';
import usersReducer from './users/userSlice';
import cashflowReducer from './cashflow/cashflowSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  cashflow: cashflowReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
