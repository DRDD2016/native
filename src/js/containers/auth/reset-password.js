import { connect } from 'react-redux';
import ResetPassword from '../../components/auth/reset-password';
import { newPassword } from '../../actions/reset-password';

const mapStateToProps = ({ reset }) => ({
  isResetting: reset.isResetting
});

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ password }, dispatch) => {
    dispatch(newPassword(password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
