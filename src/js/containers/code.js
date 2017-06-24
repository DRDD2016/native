import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Code from '../components/code';
import { submitCode } from '../actions/event/data';

const mapStateToProps = ({ event, network }) => {
  return {
    codeError: event.data.error,
    isFetching: event.data.isFetching,
    isConnected: network.isConnected,
    eventCode: network.inComingLinkCode
  };
};

const mapDispatchToProps = () => ({
  handleSubmitForm: ({ code }, dispatch, props) => { //eslint-disable-line
    console.log(code);
    AsyncStorage.getItem('spark_token')
    .then((token) => {
      if (token) {
        dispatch(submitCode(token, code, props.navigation));
      }
    })
    .catch(error => console.error(error));

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Code);
