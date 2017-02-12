import { connect } from 'react-redux';
import { setWhen, addInput, removeInput, clearCreateEvent } from '../../actions/create';
import When from '../../components/create/when';

const mapStateToProps = ({ create }) => {
  return {
    data: create.when,
    name: create.name
  };
};

const mapDispatchToProps = dispatch => ({

  handleDate: (date, inputKey) => {
    dispatch(setWhen(date, inputKey, 'date'));
  },

  handleTime: (time, inputKey) => {
    dispatch(setWhen(time, inputKey, 'time'));
  },

  addInput: (nextInputKey) => {
    dispatch(addInput(nextInputKey, 'when'));
  },

  removeInput: (lastInputKey) => {
    dispatch(removeInput(lastInputKey, 'when'));
  },

  discardEvent: () => {
    dispatch(clearCreateEvent());
  }
});

const WhenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(When);

export default WhenContainer;
