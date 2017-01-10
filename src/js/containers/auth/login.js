import { connect } from 'react-redux';
import Login from '../../components/auth/login';
import { loginUser } from '../../actions/login';

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ email, password }, dispatch, props) => {
    dispatch(loginUser(email.toLowerCase(), password));
  }
});

export default connect(mapDispatchToProps)(Login);
