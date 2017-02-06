/* eslint-disable no-unused-vars  */
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Edit from '../components/event/edit';
import { editEvent } from '../actions/event/data';
import { setDetails, clearCreateEvent } from '../actions/create';


const user_id = 3;

const mapStateToProps = ({ event: eventState, create }) => {
  console.log(eventState, create, 'CREATE CONTAINER');
  return {
    isFetching: eventState.data.isFetching,
    eventEdited: eventState.data.eventEdited,
    event: create
  };
};

const mapDispatchToProps = dispatch => ({


  handleDetailsChange: (text, category) => {
    dispatch(setDetails(text, category));
  },
  handleEditEvent: (event, event_id) => {
    AsyncStorage.getItem('spark_token')
    .then((token) => {
      if (token) {
        dispatch(editEvent(token, event, event_id));
      }
    });
  },
  discardEvent: () => {
    dispatch(clearCreateEvent());
  }
});

const EditContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);

export default EditContainer;
