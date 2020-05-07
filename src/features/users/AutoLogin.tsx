import { connect } from 'react-redux';
import { autologin } from './userSlice';

const mapDispatchToProps = {
  autologin,
};

export default connect(null, mapDispatchToProps);
