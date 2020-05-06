import React, { FC, useState } from 'react';
import LoginFeature, { LoginProps } from '../features/users/Login';
import { User } from '../types/users';

const Login: FC<LoginProps> = ({ loggedUser, loading, logIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (loading) {
    return <div>loading</div>;
  }

  if (loggedUser) {
    loggedUser = loggedUser as User;
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

export { Login };
export default LoginFeature(Login);
