import { connect } from 'react-redux';
import { setWhere, addInput, removeInput, clearCreateEvent } from '../../actions/create';
import Where from '../../components/create/where';

const mapStateToProps = ({ create }) => ({
  datum: create._where,
  name: create.name
});

const mapDispatchToProps = dispatch => ({

  handleChange: (text, inputKey) => {
    dispatch(setWhere(text, inputKey));
  },

  // handleChange: (inputKey, placeName, placeAddress) => {
  //   const address = {
  //     placeName,
  //     placeAddress: placeAddress || ''
  //   };
  //   dispatch(setWhere(address, inputKey));
  // },

  addInput: (nextInputKey) => {
    dispatch(addInput(nextInputKey, '_where'));
  },

  removeInput: (lastInputKey) => {
    dispatch(removeInput(lastInputKey, '_where'));
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
