import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Code from '../components/code';
import { submitCode } from '../actions/event/data';

const mapStateToProps = ({ event }) => {
  return {
    codeError: event.data.error
  };
};

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ code }, dispatch, props) => { //eslint-disable-line
    AsyncStorage.getItem('spark_token')
    .then((token) => {
      if (token) {
        dispatch(submitCode(token, code));
      }
    })
    .catch(error => console.error(error));

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Code);
