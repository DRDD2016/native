import update from 'immutability-helper';
import * as actions from '../actions/photos';

const initialState = {
  isFetching: false,
  error: undefined,
  signedURL: undefined,
  photo_url: undefined,
  file: undefined,
  photos: [],
  selectedPhoto: undefined,
  deletedPhotos: [],
  hasPhotoLoaded: undefined
};

export default function photos (state = initialState, action) {

  switch (action.type) {

    case actions.GET_PHOTOS:
      return handleGetPhotos(state, action);

    case actions.SET_FILE:
      return handleSetFile(state, action);

    case actions.UPLOAD_PHOTO_REQUEST:
    case actions.SAVE_PHOTO_URL_REQUEST:
      return handleRequest(state, action);

    case actions.GET_S3_URL_REQUEST:
      return handleS3URLRequest(state, action);

    case actions.SAVE_PHOTO_URL_SUCCESS:
      return handleSavePhotoURLSuccess(state, action);

    case actions.UPLOAD_PHOTO_SUCCESS:
      return handleUploadPhotoSuccess(state, action);

    case actions.UPLOAD_PHOTO_FAILURE:
    case actions.GET_S3_URL_FAILURE:
    case actions.SAVE_PHOTO_URL_FAILURE:
      return handleFailure(state, action);

    case actions.GET_S3_URL_SUCCESS:
      return handleGetS3URLSuccess(state, action);

    case actions.SELECT_PHOTO:
      return handleSelectPhoto(state, action);

    default:
      return state;
  }
}


function handleGetPhotos (state, action) {

  const newState = update(state, {
    photos: { $set: action.data || [] }
  });
  return newState;
}

function handleSetFile (state, action) {

  const newState = update(state, {
    file: { $set: action.data }
  });
  return newState;
}

function handleUploadPhotoSuccess (state, action) {

  const newState = update(state, {
    photo_url: { $set: action.data },
    isFetching: { $set: action.isFetching },
    signedURL: { $set: undefined }
  });
  return newState;
}

function handleSavePhotoURLSuccess (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    photo_url: { $set: undefined },
    hasPhotoLoaded: { $set: true },
    file: { $set: undefined }
  });
  return newState;
}

function handleRequest (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching }
  });
  return newState;
}

function handleFailure (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    error: { $set: action.error },
    photo_url: { $set: undefined },
    signedURL: { $set: undefined }
  });
  return newState;
}

function handleGetS3URLSuccess (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    signedURL: { $set: action.signedURL }
  });
  return newState;
}

function handleSelectPhoto (state, action) {

  const newState = update(state, {
    selectedPhoto: { $set: action.url }
  });
  return newState;
}

function handleS3URLRequest (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    hasPhotoLoaded: { $set: false }
  });
  return newState;
}
