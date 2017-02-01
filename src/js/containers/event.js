/* eslint-disable no-unused-vars  */
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Event from '../components/event';
import { getEvent } from '../actions/event/data';
import { postVote } from '../actions/event/poll';
import { clearCreateEvent } from '../actions/create';
import normaliseVoteData from '../lib/normalise-vote-data';


const user_id = 3;

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
  handleVote: (vote, event_id) => {
    AsyncStorage.getItem('spark_token')
    .then((token) => {
      if (token) {
        dispatch(postVote(token, normaliseVoteData(vote), event_id));
      }
    });
  },
  handleConfirmEvent: (hostEventChoices, event_id) => {
    console.log('something');
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
