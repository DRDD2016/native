/* eslint-disable max-len */
import * as actions from '../actions/feed';

const data = [
  {
    event_id: 3, // !is_poll
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
    host_user_id: '1',
    subject_user_id: '10156727442325251',
    viewed: true,
    inviteesNumber: 24,
    name: 'Day trip',
    edited: true
  },
  {
    event_id: 2,  // is_poll
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
    edited: false
  }
];

const initialState = {
  data,
  isFetching: false,
  error: undefined,
  selectedFilter: undefined,
  filterActive: false
};

export default function feed (state = initialState, action) {

  switch (action.type) {

    case actions.GET_FEED_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actions.GET_FEED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: [...state.data, ...action.data]
      };

    case actions.GET_FEED_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case actions.APPLY_FILTER:
      return { ...state, filterActive: true, selectedFilter: action.selectedFilter };

    case actions.CLEAR_FILTER:
      return { ...state, filterActive: false, selectedFilter: undefined };

    default:
      return state;
  }
}
