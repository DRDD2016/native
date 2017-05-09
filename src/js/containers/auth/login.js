import { connect } from 'react-redux';
import Login from '../../components/auth/login';
import { loginUser } from '../../actions/login';

const mapStateToProps = ({ user, network }) => ({
  serverError: user.error,
  isConnected: network.isConnected
});

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ email, password }, dispatch, props) => { //eslint-disable-line
    dispatch(loginUser(email.toLowerCase(), password, props.navigation));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
