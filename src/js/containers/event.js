import { connect } from 'react-redux';
import Event from '../components/event';
import getUserID from '../lib/getUserID';
import { getEvent, updatePoll, confirmPoll, addHostEventChoice, confirmEvent, deleteEvent, updateRSVP } from '../actions/event';
import { setFile, selectPhoto, getS3URL, deletePhoto, sharePhoto } from '../actions/photos';
import { hydrateCreateEvent, clearCreateEvent } from '../actions/create';
import listenForS3URL from '../lib/action-listeners';
import listenForSavePhotoURL from '../lib/save-photo-url-helper';
import jsonState from '../testState/jsonStateEvent.json';

import { store } from '../init-store';


const mapStateToProps = () => ({

  isPoll: jsonState.event.data.isPoll,
  event: jsonState.event.data,
  poll: jsonState.event.poll,
  hasVoted: jsonState.event.hasVoted,
  tally: jsonState.event.tally,
  RSVPs: jsonState.event.RSVPs,
  invitees: jsonState.event.invitees,
  hostEventChoices: jsonState.event.hostEventChoices,
  isFetching: jsonState.event.isFetching,
  userIsHost: jsonState.event.data.hostID === getUserID(),
  photos: jsonState.photos.photos,
  deletedPhotos: jsonState.photos.deletedPhotos,
  file: jsonState.photos.file,
  hasPhotoLoaded: jsonState.photos.hasPhotoLoaded
});

const mapDispatchToProps = dispatch => ({

  fetchEvent: (eventID) => {

    dispatch(getEvent(eventID));
  },
  toggleSelection: (eventType, index) => {

    dispatch(updatePoll(eventType, index));
  },
  handlePollConfirmation: (poll, eventID) => {

    dispatch(confirmPoll(poll, eventID));
  },
  handleHostEventChoices: (eventType, value, index) => {

    dispatch(addHostEventChoice(eventType, value, index));
  },
  handleConfirmEvent: (hostEventChoices, eventID) => {

    dispatch(confirmEvent(hostEventChoices, eventID));
  },
  handleDeleteEvent: (eventID) => {

    dispatch(deleteEvent(eventID));
  },
  handleEdit: (event) => {

    dispatch(hydrateCreateEvent(event));
  },
  RSVPToEvent: (status, eventID) => {

    dispatch(updateRSVP(status, eventID));
  },
  handleUploadPhoto: (file, eventID) => {
    listenForS3URL(store);
    listenForSavePhotoURL(store);
    dispatch(getS3URL(file.name, file.type, eventID));
  },
  handleDeletePhoto: (eventID) => {

    const selectedPhoto = store.getState().photos.selectedPhoto;
    dispatch(deletePhoto(selectedPhoto, eventID));
  },
  handleSharePhoto: () => {

    const selectedPhoto = store.getState().photos.selectedPhoto;
    dispatch(sharePhoto(selectedPhoto));
  },
  getSelectedPhoto: (photoURL) => {

    dispatch(selectPhoto(photoURL));
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
