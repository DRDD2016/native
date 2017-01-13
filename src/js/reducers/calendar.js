import update from 'immutability-helper';
import * as actions from '../actions/calendar';

const calendarData = [{
  _when: [
    {
      date: '2017-07-23',
      time: ''
    }
  ],
  name: 'Glastonbury Festival',
  is_poll: false,
  has_edited: 'true',
  host_photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/1010535_10152958307150251_1106767454_n.jpg?oh=98cef4fe7d50e0dfdea162b4db7cad6a&oe=58306D4F',
  note: '',
  _what: [
    'Camp'
  ],
  _where: [
    {
      placeName: 'Glastonbury',
      placeAddress: ''
    }
  ],
  description: 'Coldplay headlining',
  event_id: '40',
  host_user_id: '10156727442325251',
  invitees: [
    {
      firstname: 'Whaie-F',
      surname: 'Jungman',
      user_id: '10154127525974808',
      photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/13335714_10154201640209808_7730267636246825011_n.jpg?oh=e7c3646a3a7ce3c7bb73ac5c59b3c1c9&oe=5828BBC3'
    },
    {
      firstname: 'Dameo',
      surname: 'Deare',
      user_id: '10156841434360483',
      photo_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/13645092_10157135178790483_2534445721263757786_n.jpg?oh=44859aef63798726dc1d72847b3a834e&oe=57FB4F53'
    }
  ],
  rsvp: null
}];

const initialState = {
  data: calendarData,
  isFetching: false,
  error: undefined,
  showHosting: undefined,
  filter: false
};

export default function calendar (state = initialState, action) {

  switch (action.type) {

    case actions.GET_CALENDAR_REQUEST:
      return handleCalendarRequest(state, action);

    case actions.GET_CALENDAR_SUCCESS:
      return handleCalendarSuccess(state, action);

    case actions.GET_CALENDAR_FAILURE:
      return handleCalendarFailure(state, action);

    case actions.APPLY_FILTER:
    case actions.CLEAR_FILTER:
      return handleFilter(state, action);

    default:
      return state;
  }
}

function handleCalendarRequest (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching }
  });
  return newState;
}

function handleCalendarSuccess (state, action) {

  const newState = update(state, {
    isFetching: { $set: action.isFetching },
    data: { $set: action.data }
  });
  return newState;
}

function handleCalendarFailure (state, action) {

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
