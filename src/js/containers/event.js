/* eslint-disable no-unused-vars  */
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from '@exponent/ex-navigation';
import { store } from '../init-store';
import Router from '../router';
import Event from '../components/event';
import { getEvent } from '../actions/event/data';
import { postVote, finaliseEvent } from '../actions/event/poll';
import { hydrateCreateEvent, clearCreateEvent } from '../actions/create';
import normaliseVoteData from '../lib/normalise-vote-data';


const user_id = 3;

const mapStateToProps = ({ event }) => {
  return {
    isPoll: event.data.is_poll,
    event: event.data,
    vote_count: event.vote_count,
    rsvps: event.data.rsvps, // host
    isFetching: event.data.isFetching,
    userIsHost: user_id === event.data.host_user_id,
    voteSaved: event.poll.voteSaved,
    finalChoices: event.poll.finalChoices,
    error: event.data.error
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
    AsyncStorage.getItem('spark_token')
    .then((token) => {
      if (token) {
        dispatch(finaliseEvent(token, hostEventChoices, event_id));
      }
    });
  },
  handleDeleteEvent: (event_id) => {

    // delete event
  },
  handleEdit: (event) => {
    dispatch(hydrateCreateEvent(event));
    const navigatorUID = store.getState().navigation.currentNavigatorUID;
    dispatch(NavigationActions.push(navigatorUID, Router.getRoute('edit')));
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
