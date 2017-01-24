import io from 'socket.io-client';

const location = 'http://localhost:3000'; // will be something different when server is hosted!
const socket = io(`${location}/feed`, { transports: ['websocket'] });

socket.on('connected', () => {
  console.info('HEARD BACK FROM SERVER!!');
  socket.emit('join', JSON.stringify('i am a user id :)'));
  // store.dispatch(getFeed(user_id))
});

export default socket;
