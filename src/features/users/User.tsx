import React, { FC, useEffect } from 'react';
import { autologin } from './userSlice';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  autologin,
};

interface UserProps {
  autologin: () => void;
}

const User: FC<UserProps> = ({ autologin }) => {
  useEffect(() => {
    autologin();
  }, []);

  return null;
};

export default connect(null, mapDispatchToProps)(User);
