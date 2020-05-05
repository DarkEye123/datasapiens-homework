import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '..';
import { User } from '../../types/users';
import { AppDispatch } from '../../store';
import { loginUser } from './userSlice';

const mapStateToProps = (state: RootState) => ({
  loggedUser: state.users.loggedUser,
  loading: state.users.loading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    logIn: (username: string, password: string) =>
      dispatch(loginUser({ username, password })),
  };
};

type LoginProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Login: FC<LoginProps> = ({ loggedUser, loading, logIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (loading) {
    return <div>loading</div>;
  }

  if (loggedUser) {
    loggedUser = loggedUser as User;
    console.log(loggedUser);
    return (
      <>
        <div>I'm Here {loggedUser.username}</div>
      </>
    );
  }

  return (
    <div>
      <form>
        <input
          placeholder="nickname"
          onInput={(e) => setUsername(e.currentTarget.value)}
        ></input>
        <input
          placeholder="password"
          type="password"
          onInput={(e) => setPassword(e.currentTarget.value)}
        ></input>
      </form>
      <button onClick={() => logIn(username, password)} type="submit">
        log in
      </button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
