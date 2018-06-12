import * as actions from '../actions/confirm-email';

export const initialState = {
  message: '',
  isConfirming: false,
  error: undefined
};

export default function confirmUserEmail (state = initialState, action) {
  switch (action.type) {

    case actions.CONFIRM_EMAIL_REQUEST:
      return {
        ...state,
        isConfirming: true
      };

    case actions.CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        isConfirming: false,
        message: action.data.message
      };

    case actions.CONFIRM_EMAIL_FAILURE:
      return {
        ...state,
        isConfirming: false,
        error: action.error
      };

    default:
      return state;
  }
}
