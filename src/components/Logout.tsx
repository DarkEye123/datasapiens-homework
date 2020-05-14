import React, { FC } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import logoutFeature, { LogoutProps } from '../features/users/logout';

const Logout: FC<LogoutProps & Partial<ButtonProps>> = ({
  logout,
  user,
  ...other
}) => {
  if (user) {
    return (
      <Button onClick={logout} {...other}>
        Log out
      </Button>
    );
  }
  return null;
};

export { Logout };
export default logoutFeature(Logout);
