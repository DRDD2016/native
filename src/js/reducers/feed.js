/* eslint-disable max-len */
import update from 'immutability-helper';
import * as actions from '../actions/feed';

const data = [
  {
    event_id: 'event:112',
    timestamp: 1477565056943,
    firstname: 'Dave',
    surname: 'Rickard',
    photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/1010535_10152958307150251_1106767454_n.jpg?oh=66677ddeb0114051b89f333f14369332&oe=58A7144F',
    _what: [
      'Go to France'
    ],
    _where: [
      {
        placeName: 'TBC',
        placeAddress: ''
      }
    ],
    _when: [
      {
        date: '2016-09-18',
        time: ''
      }
    ],
    is_poll: false,
    host_user_id: '10156727442325251',
    subject_user_id: '10156727442325251',
    viewed: true,
    inviteesNumber: 24,
    name: 'Day trip',
    has_edited: undefined
  },
  {
    event_id: 'event:112',
    timestamp: 1477082516842,
    firstname: 'Marah',
    surname: 'Barden',
    photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/12279210_10156252155200506_7792104208279318965_n.jpg?oh=f52c8b1712fd11aea00ce928bf1a0dc6&oe=589881E8',
    _what: [
      'Go to the beach',
      'Go to France',
      'Go Ape'
    ],
    _where: [
      {
        placeName: 'TBC',
        placeAddress: ''
      }
    ],
    _when: [
      {
        date: '2016-09-11',
        time: ''
      },
      {
        date: '2016-09-18',
        time: ''
      },
      {
        date: '2016-09-24',
        time: ''
      }
    ],
    is_poll: true,
    host_user_id: '10156727442325251',
    subject_user_id: '10157183492680506',
    viewed: true,
    inviteesNumber: 24,
    name: 'Day trip',
    has_edited: undefined
  },
  {
    event_id: 'event:113',
    timestamp: 1477082468789,
    firstname: 'Marah',
    surname: 'Barden',
    photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/12279210_10156252155200506_7792104208279318965_n.jpg?oh=f52c8b1712fd11aea00ce928bf1a0dc6&oe=589881E8',
    _what: [
      'Watch Footy'
    ],
    _where: [
      {
        placeName: 'Wembley Stadium',
        placeAddress: 'Greater London HA9 0WS'
      }
    ],
    _when: [
      {
        date: '2016-09-14',
        time: '19:45'
      }
    ],
    is_poll: false,
    host_user_id: '10156727442325251',
    subject_user_id: '10157183492680506',
    viewed: true,
    inviteesNumber: 25,
    name: 'Spurs vs Monaco',
    has_edited: undefined
  },
  {
    event_id: 'event:114',
    timestamp: 1474930947717,
    firstname: 'Dameo',
    surname: 'Deare',
    photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c85.0.320.320/p320x320/14068028_10157338054715483_2448905112098811988_n.jpg?oh=cfaa12a8ef7f0b7a16a20f0f564401fe&oe=5869C835',
    _what: [
      'Watch Football'
    ],
    _where: [
      {
        placeName: 'Wembley Stadium',
        placeAddress: 'Greater London HA9 0WS'
      }
    ],
    _when: [
      {
        date: '2016-11-02',
        time: '19:45'
      }
    ],
    is_poll: false,
    host_user_id: '10156727442325251',
    subject_user_id: '10156841434360483',
    viewed: false,
    inviteesNumber: 5,
    name: 'Spurs v Bayer Leverkusen',
    has_edited: undefined
  },
  {
    event_id: 'event:114',
    timestamp: 1474575827891,
    firstname: 'Dave',
    surname: 'Rickard',
    photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/1010535_10152958307150251_1106767454_n.jpg?oh=ddb28b27195193edb4ff74a25e212825&oe=587F874F',
    _what: [
      'Watch Football'
    ],
    _where: [
      {
        placeName: 'Wembley Stadium',
        placeAddress: 'Greater London HA9 0WS'
      }
    ],
    _when: [
      {
        date: '2016-11-02',
        time: '19:45'
      }
    ],
    is_poll: false,
    host_user_id: '10156727442325251',
    subject_user_id: '10156727442325251',
    viewed: true,
    inviteesNumber: 5,
    name: 'Spurs v Bayer Leverkusen'
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
    data: { $set: action.data }
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
