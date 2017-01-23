import moment from 'moment';
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
    const chosenDate = moment(date.setHours(0, 0, 0, 0));
    dispatch(setWhen(chosenDate, inputKey, 'date'));
  },

  handleTime: (time, inputKey) => {
    const chosenTime = moment(time);
    dispatch(setWhen(chosenTime, inputKey, 'time'));
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
