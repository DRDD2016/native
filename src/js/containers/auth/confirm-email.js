import { connect } from 'react-redux';
import ConfirmEmail from '../../components/auth/confirm-email';
import { confirmEmail } from '../../actions/confirm-email';

const mapStateToProps = ({ confirmUserEmail, connectivity }) => ({
  message: confirmUserEmail.message,
  confirmEmailError: confirmUserEmail.error,
  isConfirming: confirmUserEmail.isConfirming,
  isConnected: connectivity.isConnected
});

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ email }, dispatch, props) => { //eslint-disable-line
    dispatch(confirmEmail(email.toLowerCase()));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
