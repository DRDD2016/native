import { connect } from 'react-redux';
import { setWhen, addInput, removeInput, clearCreateEvent } from '../../actions/create';
import When from '../../components/create/when';

const mapStateToProps = ({ create }) => {
  console.log(create._when);
  return {
    data: create._when,
    name: create.name,
    description: create.description
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
    dispatch(addInput(nextInputKey, '_when'));
  },

  removeInput: (lastInputKey) => {
    dispatch(removeInput(lastInputKey, '_when'));
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
