/* eslint-disable max-len */
import update from 'immutability-helper';
import * as actions from '../actions/feed';

const data = [
  {
    event_id: 'event:112',
    timestamp: new Date().toISOString(),
    firstname: 'Dave',
    surname: 'Rickard',
    photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/1010535_10152958307150251_1106767454_n.jpg?oh=66677ddeb0114051b89f333f14369332&oe=58A7144F',
    what: [
      'Go to France'
    ],
    where: [
      {
        placeName: 'TBC',
        placeAddress: ''
      }
    ],
    when: [
      new Date().toISOString()
    ],
    is_poll: false,
    host_user_id: '10156727442325251',
    subject_user_id: '10156727442325251',
    viewed: true,
    inviteesNumber: 24,
    name: 'Day trip',
    edited: undefined
  },
  {
    event_id: 'event:112',
    timestamp: new Date().toISOString(),
    firstname: 'Marah',
    surname: 'Barden',
    photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/12279210_10156252155200506_7792104208279318965_n.jpg?oh=f52c8b1712fd11aea00ce928bf1a0dc6&oe=589881E8',
    what: [
      'Go to the beach',
      'Go to France',
      'Go Ape'
    ],
    where: [
      {
        placeName: 'TBC',
        placeAddress: ''
      }
    ],
    when: [
      new Date().toISOString(),
      new Date().toISOString(),
      new Date().toISOString()
    ],
    is_poll: true,
    host_user_id: '10156727442325251',
    subject_user_id: '10157183492680506',
    viewed: true,
    inviteesNumber: 24,
    name: 'Day trip',
    edited: undefined
  },
  {
    event_id: 'event:113',
    timestamp: new Date().toISOString(),
    firstname: 'Marah',
    surname: 'Barden',
    photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/12279210_10156252155200506_7792104208279318965_n.jpg?oh=f52c8b1712fd11aea00ce928bf1a0dc6&oe=589881E8',
    what: [
      'Watch Footy'
    ],
    where: [
      {
        placeName: 'Wembley Stadium',
        placeAddress: 'Greater London HA9 0WS'
      }
    ],
    when: [
      new Date().toISOString()
    ],
    is_poll: false,
    host_user_id: '10156727442325251',
    subject_user_id: '10157183492680506',
    viewed: true,
    inviteesNumber: 25,
    name: 'Spurs vs Monaco',
    edited: undefined
  },
  {
    event_id: 'event:114',
    timestamp: new Date().toISOString(),
    firstname: 'Dameo',
    surname: 'Deare',
    photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c85.0.320.320/p320x320/14068028_10157338054715483_2448905112098811988_n.jpg?oh=cfaa12a8ef7f0b7a16a20f0f564401fe&oe=5869C835',
    what: [
      'Watch Football'
    ],
    where: [
      {
        placeName: 'Wembley Stadium',
        placeAddress: 'Greater London HA9 0WS'
      }
    ],
    when: [
      new Date().toISOString()
    ],
    is_poll: false,
    host_user_id: '10156727442325251',
    subject_user_id: '10156841434360483',
    viewed: false,
    inviteesNumber: 5,
    name: 'Spurs v Bayer Leverkusen',
    edited: undefined
  },
  {
    event_id: 'event:114',
    timestamp: new Date().toISOString(),
    firstname: 'Dave',
    surname: 'Rickard',
    photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/1010535_10152958307150251_1106767454_n.jpg?oh=ddb28b27195193edb4ff74a25e212825&oe=587F874F',
    what: [
      'Watch Football'
    ],
    where: [
      {
        placeName: 'Wembley Stadium',
        placeAddress: 'Greater London HA9 0WS'
      }
    ],
    when: [
      new Date().toISOString()
    ],
    is_poll: false,
    host_user_id: '10156727442325251',
    subject_user_id: '10156727442325251',
    viewed: true,
    inviteesNumber: 5,
    name: 'Spurs v Bayer Leverkusen',
    edited: undefined
  }
];

const initialState = {
  data,
  isFetching: false,
  error: undefined,
  showHosting: undefined,
  filter: false
};

export default function feed (state = initialState, action) {

  switch (action.type) {

    case actions.GET_FEED_REQUEST:
      return handleGetFeedRequest(state, action);

    case actions.GET_FEED_SUCCESS:
      return handleGetFeedSuccess(state, action);

    case actions.GET_FEED_FAILURE:
      return handleGetFeedFailure(state, action);

    case actions.APPLY_FILTER:
    case actions.CLEAR_FILTER:
      return handleFilter(state, action);

    default:
      return state;
  }
}

function handleGetFeedRequest (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching }
  });
  return newState;
}

function handleGetFeedSuccess (state, action) {
  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    data: { $set: state.data.concat(action.data) }
  });
  return newState;
}

function handleGetFeedFailure (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    error: { $set: action.error }
  });
  return newState;
}


function handleFilter (state, action) {

  const newState = update(state, {
    filter: { $set: action.filter },
    showHosting: { $set: action.showHosting }
  });
  return newState;
}
