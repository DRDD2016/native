import { connect } from 'react-redux';
import Login from '../../components/auth/login';

const mapDispatchToProps = () => ({
  handleSubmitForm: (values, dispatch, props) => {
    console.log(values, dispatch, props);
  }
});

export default connect(mapDispatchToProps)(Login);
