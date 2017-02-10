import io from 'socket.io-client';
import { store } from './init-store';
import { getFeedRequest, getFeedSuccess, getFeedFailure } from './actions/feed'; // eslint-disable-line no-unused-vars

const location = 'http://localhost:3000'; // will be something different when server is hosted!
const socket = io(`${location}/feed`, { transports: ['websocket'] });
const INIT_FEED = 'INIT_FEED';

socket.on('connected', (socketId) => {
  // clients emits to the server (client emits INIT_FEED )
  socket.emit(INIT_FEED);
  store.dispatch(getFeedRequest()); // spinner

  // server emits the 'uniqueID' - data- array of feed items
  socket.on(socketId, (data) => {
    store.dispatch(getFeedSuccess(data));
  });

  socket.on('failure', (error) => {
    store.dispatch(getFeedFailure(error));
  });
});

export default socket;
