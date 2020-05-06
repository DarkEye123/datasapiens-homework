import { autologin } from './userSlice';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  autologin,
};

export default connect(null, mapDispatchToProps);
