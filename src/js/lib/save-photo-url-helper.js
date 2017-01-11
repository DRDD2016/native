import { savePhotoURL } from '../actions/photos';

export default function listenForSavePhotoURL (store) {

  const unsubscribe = store.subscribe(listener);

  function listener () {

    const status = getPhotoURLStatus(store.getState());

    if (status) {

      unsubscribe();
      const event_id = getEventIDFromStore(store.getState());
      const photo_url = getPhotoURLFromStore(store.getState());
      store.dispatch(savePhotoURL(photo_url, event_id));
    }
  }

  function getPhotoURLFromStore (state) {
    return state.photos.photo_url;
  }

  function getEventIDFromStore (state) {
    return state.event.data.event_id;
  }

  function getPhotoURLStatus (state) {
    return state.photos.photo_url;
  }
}
