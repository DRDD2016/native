import Config from 'react-native-config';
import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';
import { store } from './init-store';
import { getFeedRequest, getFeedSuccess, getFeedFailure } from './actions/feed'; // eslint-disable-line no-unused-vars

const location = `${Config.HOST}:${Config.PORT}`; // will be something different when server is hosted!
const socket = io(`${location}/feed`, { transports: ['websocket'] });
const INIT_FEED = 'INIT_FEED';

socket.on('connected', () => {
  // clients emits to the server (client emits INIT_FEED )
  AsyncStorage.getItem('spark_user_id')
  .then((user_id) => {
    if (user_id) {
      socket.emit(INIT_FEED, user_id);
      store.dispatch(getFeedRequest()); // spinner

      socket.on(`feed:${user_id}`, (data) => {
        store.dispatch(getFeedSuccess(data));
      });

      socket.on(`failure:${user_id}`, (error) => {
        store.dispatch(getFeedFailure(error));
      });
    }
  });
});

export default socket;
