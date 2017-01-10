import { connect } from 'react-redux';
import Signup from '../../components/auth/signup';
import { signupUser } from '../../actions/signup';

const mapStateToProps = ({ signup }) => ({
  isSigningUp: signup.isSigningUp
});

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ firstname, surname, email, password }, dispatch) => {
    dispatch(signupUser(firstname, surname, email.toLowerCase(), password));

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
