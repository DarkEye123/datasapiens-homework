import { connect } from 'react-redux';
import { RootState } from '..';
import { AppDispatch } from '../../store';
import { loginUser } from './userSlice';

const mapStateToProps = (state: RootState) => ({
  user: state.users.user,
  loading: state.users.loading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    logIn: (username: string, password: string) =>
      dispatch(loginUser({ username, password })),
  };
};

export type LoginProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);
