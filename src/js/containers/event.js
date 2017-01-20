import { connect } from 'react-redux';
import Event from '../components/event';
import { getEvent } from '../actions/event/data';
import { vote } from '../actions/event/poll';
import { clearCreateEvent } from '../actions/create';


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
  handleConfirmEvent: (hostEventChoices, event_id) => {

    // confirm event (convert from poll to confirmed event)
  },
  handleDeleteEvent: (event_id) => {

    // delete event
  },
  handleEdit: (event) => {

    // get event?
  },
  rsvpToEvent: (status, event_id) => {

    // update rsvp
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
