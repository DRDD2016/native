import { connect } from 'react-redux';
import Event from '../components/event';
import getUserID from '../lib/getUserID';
import { getEvent, updatePoll, vote, addHostEventChoice, confirmEvent, deleteEvent, updateRSVP } from '../actions/event';
import { setFile, selectPhoto, getS3URL, deletePhoto, sharePhoto } from '../actions/photos';
import { hydrateCreateEvent, clearCreateEvent } from '../actions/create';
import listenForS3URL from '../lib/action-listeners';
import listenForSavePhotoURL from '../lib/save-photo-url-helper';
import jsonState from '../testState/jsonStateEvent.json';

import { store } from '../init-store';


const mapStateToProps = state => ({

  isPoll: state.event.data.is_poll,
  event: state.event.data,
  poll: state.event.poll,
  hasVoted: state.event.hasVoted,
  tally: state.event.tally,
  RSVPs: state.event.RSVPs,
  invitees: state.event.invitees,
  hostEventChoices: state.event.hostEventChoices,
  isFetching: state.event.isFetching,
  userIsHost: state.event.data.hostID === getUserID(),
  photos: state.photos.photos,
  deletedPhotos: state.photos.deletedPhotos,
  file: state.photos.file,
  hasPhotoLoaded: state.photos.hasPhotoLoaded
});

const mapDispatchToProps = dispatch => ({

  fetchEvent: (event_id) => {

    dispatch(getEvent(event_id));
  },
  toggleSelection: (eventType, index) => {

    dispatch(updatePoll(eventType, index));
  },
  handlePollConfirmation: (poll, event_id) => {

    dispatch(vote(poll, event_id));
  },
  handleHostEventChoices: (eventType, value, index) => {

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
  handleUploadPhoto: (file, event_id) => {
    listenForS3URL(store);
    listenForSavePhotoURL(store);
    dispatch(getS3URL(file.name, file.type, event_id));
  },
  handleDeletePhoto: (event_id) => {

    const selectedPhoto = store.getState().photos.selectedPhoto;
    dispatch(deletePhoto(selectedPhoto, event_id));
  },
  handleSharePhoto: () => {

    const selectedPhoto = store.getState().photos.selectedPhoto;
    dispatch(sharePhoto(selectedPhoto));
  },
  getSelectedPhoto: (photo_url) => {

    dispatch(selectPhoto(photo_url));
  },
  handleSetFile: (file) => {

    dispatch(setFile(file));
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
