import { connect } from 'react-redux';
import { setWhere, addInput, removeInput, clearCreateEvent } from '../../actions/create';
import Where from '../../components/create/where';

const mapStateToProps = ({ create }) => ({
  data: create._where,
  name: create.name,
  description: create.description
});

const mapDispatchToProps = dispatch => ({

  handleChange: (inputKey, placeName, placeAddress) => {
    const address = {
      placeName,
      placeAddress: placeAddress || ''
    };
    dispatch(setWhere(address, inputKey));
  },

  addInput: (nextInputKey) => {
    dispatch(addInput(nextInputKey, 'eventWhere'));
  },

  removeInput: (lastInputKey) => {
    dispatch(removeInput(lastInputKey, 'eventWhere'));
  },

  discardEvent: () => {
    dispatch(clearCreateEvent());
  }
});

const WhereContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Where);

export default WhereContainer;
