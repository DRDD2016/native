import { connect } from 'react-redux';
import Code from '../components/event-code';
// import { submitCode } from '../actions/code';

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ code }, dispatch, props) => {
    // dispatch(submitCode(code);
  }
});

export default connect(mapDispatchToProps)(Code);
