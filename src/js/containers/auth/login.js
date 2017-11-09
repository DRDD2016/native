import { connect } from 'react-redux';
import Login from '../../components/auth/login';
import { loginUser, loginUserReset } from '../../actions/login';

const mapStateToProps = ({ user, network }) => ({
  serverError: user.error,
  isConnected: network.isConnected,
  isLoggingIn: user.isLoggingIn
});

const mapDispatchToProps = dispatch => ({
  handleSubmitForm: ({ email, password }, props, navigation) => { //eslint-disable-line
    dispatch(loginUser(email.toLowerCase(), password, navigation.navigation));
  },
  handleResetLogin: () => {
    dispatch(loginUserReset());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
