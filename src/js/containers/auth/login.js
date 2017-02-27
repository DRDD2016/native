import { connect } from 'react-redux';
import Login from '../../components/auth/login';
import { loginUser } from '../../actions/login';

const mapStateToProps = ({ user }) => ({
  serverError: user.error
});

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ email, password }, dispatch, props) => { //eslint-disable-line
    dispatch(loginUser(email.toLowerCase(), password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
