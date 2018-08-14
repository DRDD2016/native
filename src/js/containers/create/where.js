import { connect } from 'react-redux';
import { setWhere, addInput, removeInput, clearCreateEvent } from '../../actions/create';
import Where from '../../components/create/where';

const mapStateToProps = ({ create }) => ({
  data: create.where,
  name: create.name
});

const mapDispatchToProps = dispatch => ({

  handleChange: (text, inputKey) => {
    console.log(`handleChange: text:${text} inputKey: ${inputKey}`);
    dispatch(setWhere(text, inputKey));
  },

  addInput: (nextInputKey) => {
    dispatch(addInput(nextInputKey, 'where'));
  },

  removeInput: (inputKey) => {
    dispatch(removeInput(inputKey, 'where'));
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
