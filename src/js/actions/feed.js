// import axios from 'axios';
// import getUserID from '../lib/getUserID.js';
//
// export const GET_FEED = "GET_FEED";
// export const GET_FEED_REQUEST = "GET_FEED_REQUEST";
// export const GET_FEED_SUCCESS = "GET_FEED_SUCCESS";
// export const GET_FEED_FAILURE = "GET_FEED_FAILURE";
// export const APPLY_FILTER = "APPLY_FILTER";
// export const CLEAR_FILTER = "CLEAR_FILTER";
//
// import { feedSocket } from '../socket.js';
// import { store } from '../init-store.js';
//
//
// export function getFeed (user_id) {
//
//     return (dispatch) => {
//
//         dispatch(getFeedRequest());
//
//         feedSocket.on('feed:' + user_id, (data) => {
//
//             store.dispatch(getFeedSuccess(data));
//         });
//
//         feedSocket.on('failure', (error) => {
//
//             store.dispatch(getFeedFailure(error));
//         });
//     };
// }
//
// export function getFeedRequest () {
//     return {
//         type: GET_FEED_REQUEST,
//         isFetching: true
//     };
// }
//
// export function getFeedSuccess (data) {
//     return {
//         type: GET_FEED_SUCCESS,
//         isFetching: false,
//         data
//     };
// }
//
// export function getFeedFailure (error) {
//     return {
//         type: GET_FEED_FAILURE,
//         isFetching: false,
//         error
//     };
// }
//
// export function applyFilter (filter) {
//     return {
//         type: APPLY_FILTER,
//         filter: true,
//         showHosting: filter
//     };
// }
//
//
// export function clearFilter () {
//     return {
//         type: CLEAR_FILTER,
//         filter: false,
//         showHosting: undefined
//     };
// }
