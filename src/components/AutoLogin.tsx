import { FC, useEffect } from 'react';
import AutoLoginFeature from '../features/users/AutoLogin';

interface UserProps {
  autologin: () => void;
}

const AutoLogin: FC<UserProps> = ({ autologin }) => {
  useEffect(() => {
    autologin();
  }, [autologin]);

  return null;
};

export { AutoLogin };
export default AutoLoginFeature(AutoLogin);
