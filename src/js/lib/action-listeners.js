import { uploadPhoto } from '../actions/photos';


export default function listenForS3URL (store) {
  const unsubscribe = store.subscribe(listener);

  function listener () {
    const status = store.getState().photos.signedURL;

    if (status) {
      unsubscribe();
      const file = store.getState().photos.file;
      const url = store.getState().photos.signedURL;
      store.dispatch(uploadPhoto(url, file));
    }
  }
}
