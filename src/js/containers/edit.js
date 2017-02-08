/* eslint-disable no-unused-vars  */
import moment from 'moment';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Edit from '../components/event/edit';
import { editEvent } from '../actions/event/data';
import { setDetails, clearCreateEvent, setWhat, setWhere, setWhen } from '../actions/create';

const user_id = 3;

const mapStateToProps = ({ event: eventState, create }) => {
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
  handleWhatChange: (text, inputKey) => {
    dispatch(setWhat(text, inputKey));
  },
  handleWhereChange: (text, inputKey) => {
    dispatch(setWhere(text, inputKey));
  },
  handleDateChange: (date, inputKey) => {
    dispatch(setWhen(date, inputKey, 'date'));
  },
  handleTimeChange: (time, inputKey) => {
    const chosenTime = moment(time);
    dispatch(setWhen(chosenTime, inputKey, 'time'));
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
