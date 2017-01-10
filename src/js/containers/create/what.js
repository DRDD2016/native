import { connect } from 'react-redux';
import { setWhat, addInput, removeInput, clearCreateEvent } from '../../actions/create';
import What from '../../components/create/what';

const mapStateToProps = ({ create }) => {
  return {
    data: create._what,
    name: create.name,
    description: create.description
  };
};

const mapDispatchToProps = dispatch => ({

  handleChange: (text, inputKey) => {
    dispatch(setWhat(text, inputKey));
  },

  addInput: (nextInputKey) => {
    dispatch(addInput(nextInputKey, '_what'));
  },

  removeInput: (inputIndex) => {
    dispatch(removeInput(inputIndex, '_what'));
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
