/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */

import update from 'immutability-helper';
import { SET_FILE } from '../actions/photos';
import { GET_PHOTOS } from '../actions/photos';
import { GET_S3_URL_REQUEST, GET_S3_URL_SUCCESS, GET_S3_URL_FAILURE } from '../actions/photos';
import { UPLOAD_PHOTO_REQUEST, UPLOAD_PHOTO_SUCCESS, UPLOAD_PHOTO_FAILURE } from '../actions/photos';
import { SAVE_PHOTO_URL_REQUEST, SAVE_PHOTO_URL_SUCCESS, SAVE_PHOTO_URL_FAILURE } from '../actions/photos';
import { SELECT_PHOTO } from '../actions/photos';
import { GET_DELETED_PHOTOS } from '../actions/photos';
import { DELETE_PHOTO_REQUEST, DELETE_PHOTO_SUCCESS, DELETE_PHOTO_FAILURE } from '../actions/photos';
import { SHARE_PHOTO_REQUEST, SHARE_PHOTO_SUCCESS, SHARE_PHOTO_FAILURE } from '../actions/photos';


const initialState = {
  isFetching: false,
  error: undefined,
  signedURL: undefined,
  photoURL: undefined,
  file: undefined,
  photos: [],
  selectedPhoto: undefined,
  deletedPhotos: [],
  hasPhotoLoaded: undefined
};

export default function photos (state = initialState, action) {

  switch (action.type) {

    case GET_PHOTOS:
      return handleGetPhotos(state, action);

    case SET_FILE:
      return handleSetFile(state, action);

    case GET_DELETED_PHOTOS:
      return handleGetDeletedPhotos(state, action);

    case UPLOAD_PHOTO_REQUEST:
    case SAVE_PHOTO_URL_REQUEST:
    case DELETE_PHOTO_REQUEST:
    case DELETE_PHOTO_SUCCESS:
    case SHARE_PHOTO_REQUEST:
    case SHARE_PHOTO_SUCCESS:
      return handleRequest(state, action);

    case GET_S3_URL_REQUEST:
      return handleS3URLRequest(state, action);

    case SAVE_PHOTO_URL_SUCCESS:
      return handleSavePhotoURLSuccess(state, action);

    case UPLOAD_PHOTO_SUCCESS:
      return handleUploadPhotoSuccess(state, action);

    case UPLOAD_PHOTO_FAILURE:
    case GET_S3_URL_FAILURE:
    case SAVE_PHOTO_URL_FAILURE:
    case DELETE_PHOTO_FAILURE:
    case SHARE_PHOTO_FAILURE:
      return handleFailure(state, action);

    case GET_S3_URL_SUCCESS:
      return handleGetS3URLSuccess(state, action);

    case SELECT_PHOTO:
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

function handleGetDeletedPhotos (state, action) {
  const newState = update(state, {
    deletedPhotos: { $set: action.data || [] }
  });
  return newState;
}

function handleUploadPhotoSuccess (state, action) {

  const newState = update(state, {
    photoURL: { $set: action.data },
    isFetching: { $set: action.isFetching },
    signedURL: { $set: undefined }
  });
  return newState;
}

function handleSavePhotoURLSuccess (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    photoURL: { $set: undefined },
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
    photoURL: { $set: undefined },
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
