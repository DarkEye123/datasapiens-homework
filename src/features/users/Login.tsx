import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from '..';
import { User } from '../../types/users';
import { AppDispatch } from '../../store';
import { loginUser } from './userSlice';

const mapStateToProps = (state: RootState) => ({
  loggedUser: state.users.loggedUser,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    handleLogIn: () =>
      dispatch(loginUser({ nickname: 'Matej', password: 'abeceda' })),
  };
};

type LoginProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Login: FC<LoginProps> = ({ loggedUser, handleLogIn }) => {
  if (loggedUser) {
    loggedUser = loggedUser as User;
    console.log(loggedUser);
    return (
      <>
        <div>I'm Here {loggedUser.nickname}</div>
      </>
    );
  }
  return (
    <>
      <div>not logged in</div>
      <button onClick={handleLogIn}>log in</button>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
