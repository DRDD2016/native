import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Code from '../components/code';
import { submitCode } from '../actions/event/data';

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ code }, dispatch, props) => {
    AsyncStorage.getItem('spark_token')
    .then((token) => {
      if (token) {
        dispatch(submitCode(token, code));
      }
    })
    .catch((error) => console.error(error));

  }
});

export default connect(mapDispatchToProps)(Code);
