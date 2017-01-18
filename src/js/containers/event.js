import { connect } from 'react-redux';
import Event from '../components/event';
import { getEvent, vote, addHostEventChoice, confirmEvent, deleteEvent, updateRSVP } from '../actions/event';
import { hydrateCreateEvent, clearCreateEvent } from '../actions/create';


const user_id = 1;

const mapStateToProps = ({ event }) => {
  return {
    isPoll: event.data.is_poll,
    event: event.data,
    vote_count: event.vote_count,
    rsvps: event.data.rsvps, // host
    isFetching: event.data.isFetching,
    userIsHost: user_id === event.data.host_user_id
  };
};

const mapDispatchToProps = dispatch => ({

  fetchEvent: (event_id) => {

    dispatch(getEvent(event_id));
  },
  handleVote: (poll, event_id) => {

    dispatch(vote(poll, event_id));
  },
  handleHostEventChoices: (eventType, value, index) => { // redux form?

    dispatch(addHostEventChoice(eventType, value, index));
  },
  handleConfirmEvent: (hostEventChoices, event_id) => {

    dispatch(confirmEvent(hostEventChoices, event_id));
  },
  handleDeleteEvent: (event_id) => {

    dispatch(deleteEvent(event_id));
  },
  handleEdit: (event) => {

    dispatch(hydrateCreateEvent(event));
  },
  RSVPToEvent: (status, event_id) => {

    dispatch(updateRSVP(status, event_id));
  },
  discardEvent: () => {
    dispatch(clearCreateEvent());
  }
});

const EventContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Event);

export default EventContainer;
