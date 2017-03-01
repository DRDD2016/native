import Config from 'react-native-config';
import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';
import { store } from './init-store';
import { getFeedRequest, getFeedSuccess, getFeedFailure } from './actions/feed';
import { storeSocket } from './actions/profile';

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
        console.log('initiliase feed');
        store.dispatch(getFeedRequest());

        socket.on(`feed:${user_id}`, (data) => {
          store.dispatch(getFeedSuccess(data));
        });

        socket.on(`hydrateFeed:${user_id}`, (data) => {
          const existingFeed = store.getState().feed.data;
          if (existingFeed.length === 0) { // only add to feed if it's empty (avoid duplicates)
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
