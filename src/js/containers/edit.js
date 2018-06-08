/* eslint-disable no-unused-vars  */
import moment from 'moment';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import mapToISOString from '../lib/map-to-iso-string';
import Edit from '../components/event/edit';
import { editEvent } from '../actions/event/data';
import { setDetails, clearCreateEvent, setWhat, setWhere, setWhen } from '../actions/create';

const user_id = 3;

const mapStateToProps = ({ event: eventState, create }) => {
  return {
    isFetching: eventState.data.isFetching,
    eventEdited: eventState.data.eventEdited,
    event: create,
    event_id: eventState.data.event_id
  };
};

const mapDispatchToProps = dispatch => ({

  handleDetailsChange: (text, category) => {
    dispatch(setDetails(text, category));
  },
  handleWhatChange: (text, inputKey = 0) => {
    dispatch(setWhat(text, inputKey));
  },
  handleWhereChange: (text, inputKey = 0) => {
    dispatch(setWhere(text, inputKey));
  },
  handleDateChange: (date, inputKey = 0) => {
    dispatch(setWhen(date, inputKey, 'date'));
  },
  handleTimeChange: (time, inputKey = 0) => {
    dispatch(setWhen(time, inputKey, 'time'));
  },
  handleEditEvent: (event, event_id) => {
    const data = Object.assign({}, event,
      { when: mapToISOString(event.when) }
    );
    console.log('event: ', event);
    AsyncStorage.getItem('spark_token')
    .then((token) => {
      if (token) {
        dispatch(editEvent(token, data, event_id));
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
