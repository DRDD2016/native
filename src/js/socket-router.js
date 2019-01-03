import Config from 'react-native-config';
import io from 'socket.io-client';
import _ from 'lodash';
import { AsyncStorage, YellowBox } from 'react-native';
import { store } from './init-store';
import { getCalendar } from './actions/calendar';
import { getFeedSuccess, getFeedFailure, getFeedRequest } from './actions/feed';
import { storeSocket } from './actions/network';

YellowBox.ignoreWarnings([
  'Setting a timer',
  'Require cycle:'
]);

// export function stopSocket () {
//   const location = `${Config.URI}`;
//   const socket = io(`${location}/feed`, { transports: ['websocket'] });
//
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// }

function initSocket () {
  const location = `${Config.URI}`;
  const socket = io(`${location}/feed`, { transports: ['websocket'] });
  const INIT_FEED = 'INIT_FEED';

  socket.on('connected', () => {
    // clients emits to the server (client emits INIT_FEED )
    AsyncStorage.getItem('spark_user_id')
    .then((user_id) => {
      if (user_id) {
        socket.emit(INIT_FEED, user_id);
        console.log('initialising feed.  getting calendar');
        AsyncStorage.getItem('spark_token')
        .then((token) => {
          console.log('token', token);
          if (token) {
            store.dispatch(getCalendar(token));
          }
        });

        socket.on(`feed:${user_id}`, (data) => {
          store.dispatch(getFeedRequest);
          console.log('new feed item', data.length);
          const mostRecentFeedItem = _.last(store.getState().feed.data);
          if (mostRecentFeedItem && !_.isEqual(mostRecentFeedItem, data[0])) {
            console.log('updating feed');
            store.dispatch(getFeedSuccess(data));
          }
        });

        socket.on(`hydrateFeed:${user_id}`, (data) => {
          store.dispatch(getFeedRequest);
          const existingFeed = store.getState().feed.data;
          if (!_.isEqual(data, existingFeed)) {
            console.log('hydrating feed');
            store.dispatch(getFeedSuccess(data));
          }
        });

        socket.on(`failure:${user_id}`, (error) => {
          store.dispatch(getFeedFailure(error));
        });
      }
    });
  });

  store.dispatch(storeSocket(socket));
}

export default initSocket;
