import { connect } from 'react-redux';
import { setWhat, addInput, removeInput, clearCreateEvent } from '../../actions/create';
import What from '../../components/create/what';

const mapStateToProps = ({ create }) => ({
  data: create.what,
  name: create.name
});

const mapDispatchToProps = dispatch => ({

  handleChange: (text, inputKey) => {
    dispatch(setWhat(text, inputKey));
  },

  addInput: (nextInputKey) => {
    dispatch(addInput(nextInputKey, 'what'));
  },

  removeInput: (inputIndex) => {
    dispatch(removeInput(inputIndex, 'what'));
  },

  discardEvent: () => {
    dispatch(clearCreateEvent());
  }
});

const WhatContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(What);

export default WhatContainer;
