import { connect } from 'react-redux';
import { logout } from './userSlice';
import { RootState } from '..';

const mapDispatchToProps = {
  logout,
};

interface DispatchShape {
  logout: () => void;
}

const mapStateToProps = (state: RootState) => ({
  user: state.users.user,
});

export type LogoutProps = ReturnType<typeof mapStateToProps> & DispatchShape;

export default connect(mapStateToProps, mapDispatchToProps);
