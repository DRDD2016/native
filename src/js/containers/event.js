/* eslint-disable no-unused-vars  */
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { store } from '../init-store';
import Event from '../components/event';
import { getEvent, getUserById, updateRsvp, deleteEvent } from '../actions/event/data';
import { postVote, finaliseEvent, dismissModal } from '../actions/event/poll';
import { hydrateCreateEvent, clearCreateEvent } from '../actions/create';
import { deleteIncomingLink } from '../actions/network';
import normaliseVoteData from '../lib/normalise-vote-data';
import { openWhatsApp, composeWhatsAppMessage } from '../lib/branchLink';


const mapStateToProps = ({ event, user, network }) => {
  return {
    isPoll: event.data.is_poll,
    event: event.data,
    vote_count: event.vote_count,
    rsvps: event.data.rsvps, // host
    isFetching: event.data.isFetching,
    userIsHost: user.user_id === event.data.host_user_id,
    voteSaved: event.poll.voteSaved,
    finalChoices: event.poll.finalChoices,
    voteCount: event.poll.voteCount,
    error: event.data.error,
    isConnected: network.isConnected,
    cancelled: event.data.cancelled
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    fetchEvent: (event_id) => {

      dispatch(getEvent(event_id));
    },
    getUserById: (user_id) => {
      console.log('user_id: ', user_id);
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          dispatch(getUserById(token, user_id));
        }
      });
    },
    handleVote: (vote, event_id) => {
      console.log('handleVote: ', `${JSON.stringify(vote)} / event_id: ${event_id}`);
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          dispatch(postVote(token, normaliseVoteData(vote), event_id, navigation));
        }
      });
    },
    handleConfirmEvent: (hostEventChoices, event_id) => {
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          dispatch(finaliseEvent(token, hostEventChoices, event_id));
        }
      });
    },
    handleDeleteEvent: (event, event_id) => {
      console.log('handleDelete Event Container');
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        console.log('delete token', token);
        console.log('delete event id', event_id);
        if (token) {
          dispatch(deleteEvent(token, event, event_id, navigation));
          // navigation.updateCurrentRouteParams({
          //   eventIsCancelled: true     // might need to redux this
          // });
        }
      });
    },
    rsvpToEvent: (event_id, status) => {
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          dispatch(updateRsvp(token, event_id, status));
        }
      });
    },
    discardEvent: () => {
      dispatch(clearCreateEvent());
    },
    handleInviteMoreFriends: () => {
      const event = store.getState().event.data;
      openWhatsApp(composeWhatsAppMessage(store.getState().user, event, event.code));
    },
    stopFetchingLink: () => { //eslint-disable-line

      dispatch(deleteIncomingLink());

    }
  };
};

const EventContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Event);

export default EventContainer;
