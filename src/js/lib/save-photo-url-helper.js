import { savePhotoURL } from '../actions/photos';

export default function listenForSavePhotoURL (store) {

  const unsubscribe = store.subscribe(listener);

  function listener () {

    const status = getPhotoURLStatus(store.getState());

    if (status) {

      unsubscribe();
      const eventID = getEventIDFromStore(store.getState());
      const photoURL = getPhotoURLFromStore(store.getState());
      store.dispatch(savePhotoURL(photoURL, eventID));
    }
  }

  function getPhotoURLFromStore (state) {
    return state.photos.photoURL;
  }

  function getEventIDFromStore (state) {
    return state.event.data.eventID;
  }

  function getPhotoURLStatus (state) {
    return state.photos.photoURL;
  }
}
