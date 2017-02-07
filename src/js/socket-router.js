import io from 'socket.io-client';
import { store } from './init-store';
import { getFeedRequest, getFeedSuccess, getFeedFailure } from './actions/feed'; // eslint-disable-line no-unused-vars

const location = 'http://localhost:3000'; // will be something different when server is hosted!
const socket = io(`${location}/feed`, { transports: ['websocket'] });
const token = 'FAKE TOKEN';
const INIT_FEED = 'INIT_FEED';

socket.on('connected', () => {
  console.info('Server connection initialised.');
  socket.emit(INIT_FEED, token);
  // store.dispatch(getFeedRequest())
  // need access to user's id or token
  socket.on(`feed: ${token}`, (data) => {
    console.log(`GOT DATA ${new Date()}`, data);
    // store.dispatch(getFeedSuccess(data));
  });

  socket.on('failure', (error) => {
    store.dispatch(getFeedFailure(error));
  });
});

export default socket;
