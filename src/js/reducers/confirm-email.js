import update from 'immutability-helper';
import * as actions from '../actions/confirm-email';

export const initialState = {
  isConfirming: false,
  error: undefined
};

export default function confirmEmail (state = initialState, action) {
  switch (action.type) {

    case actions.SEND_EMAIL_REQUEST:
      return update(state, {
        isConfirming: { $set: true }
      });

    case actions.SEND_EMAIL_SUCCESS:
      return initialState;

    case actions.SEND_EMAIL_FAILURE:
      return update(state, {
        isConfirming: { $set: false },
        error: { $set: action.error }
      });

    default:
      return state;
  }
}
