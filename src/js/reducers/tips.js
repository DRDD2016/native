import * as actions from '../actions/tips';


const initialState = {
  tipsNo: 0
};

const tips = (state = initialState, action) => {
  switch (action.type) {
    case actions.NEXT_TIPS:
      console.log('state.tipsNo', state.tipsNo);
      return {
        ...state,
        tipsNo: state.tipsNo + 1
      };

    default:
      return state;
  }
};

export default tips;
