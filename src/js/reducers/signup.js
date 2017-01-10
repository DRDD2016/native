import update from 'immutability-helper';
import * as actions from '../actions/signup';

export const initialState = {
  isSigningUp: false,
  error: undefined
};

export default function signup (state = initialState, action) {
  switch (action.type) {

    case actions.SIGNUP_USER_REQUEST:
      return update(state, {
        isSigningUp: { $set: true }
      });

    case actions.SIGNUP_USER_SUCCESS:
      return initialState;

    case actions.SIGNUP_USER_FAILURE:
      return update(state, {
        isSigningUp: { $set: false },
        error: { $set: action.error }
      });

    default:
      return state;
  }
}
