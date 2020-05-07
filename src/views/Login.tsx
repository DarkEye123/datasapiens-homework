import React, { FC, useState } from 'react';
import { RouteProps, Redirect } from 'react-router-dom';
import LoginFeature, { LoginProps } from '../features/users/Login';
import { PAGES } from '../routes';

const Login: FC<LoginProps & RouteProps> = ({
  loggedUser,
  loading,
  logIn,
  location,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { from }: any = location?.state || { from: { pathname: PAGES.home } };

  if (loading) {
    return <div>loading</div>;
  }

  if (loggedUser) {
    return <Redirect to={from} />;
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
