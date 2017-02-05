import { connect } from 'react-redux';
import ConfirmEmail from '../../components/auth/confirm-email';
import { confirmEmail } from '../../actions/confirm-email';

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ email }, dispatch, props) => { //eslint-disable-line
    dispatch(confirmEmail(email.toLowerCase()));
  }
});

export default connect(mapDispatchToProps)(ConfirmEmail);
