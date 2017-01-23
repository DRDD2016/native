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
    date.setHours(0, 0, 0, 0);
    console.log(date.toISOString());
    dispatch(setWhen(date, inputKey, 'date'));
  },

  handleTime: (time, inputKey) => {
    // today minus selected
    const chosenTime = moment(time);

    const timeAsArray = `${chosenTime.hour()}:${chosenTime.minute()}`.split(':');
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
