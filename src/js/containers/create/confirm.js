import { connect } from 'react-redux';
import { newEvent, clearCreateEvent } from '../../actions/create';
import Confirm from '../../components/create/confirm';
import { store } from '../../init-store';
// import jsonState from '../../testState/jsonStateCreate.json';

const mapStateToProps = (state) => { //eslint-disable-line

  // const sortedDates = jsonState.createEvent.eventWhen.sort((a, b) => {
  //   return (a.date + a.time) > (b.date + b.time);
  // });

  // const data = {
  //   eventName: jsonState.createEvent.eventDetails.eventName,
  //   eventDescription: jsonState.createEvent.eventDetails.eventDescription,
  //   eventNote: jsonState.createEvent.eventDetails.eventNote,
  //   eventWhat: jsonState.createEvent.eventWhat,
  //   eventWhere: jsonState.createEvent.eventWhere,
  //   eventWhen: sortedDates,
  //   invitees: jsonState.createEvent.invitees
  // };

  return {
    // data: cleanEventData(data),
    // eventDetails: jsonState.createEvent.eventDetails
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveEvent: (data) => {
      const state = store.getState();
      data.hostID = state.user.id;
      data.hostPhotoURL = state.user.photoURL;
      dispatch(newEvent(data));
    },
    discardEvent: () => {
      dispatch(clearCreateEvent());
    }
  };
};

const ConfirmContainer = connect(
    mapDispatchToProps
)(Confirm);

export default ConfirmContainer;
