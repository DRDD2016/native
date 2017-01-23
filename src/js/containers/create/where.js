import { connect } from 'react-redux';
import { setWhere, addInput, removeInput, clearCreateEvent } from '../../actions/create';
import Where from '../../components/create/where';

const mapStateToProps = ({ create }) => ({
  datum: create.where,
  name: create.name
});

const mapDispatchToProps = dispatch => ({

  handleChange: (text, inputKey) => {
    dispatch(setWhere(text, inputKey));
  },

  addInput: (nextInputKey) => {
    dispatch(addInput(nextInputKey, 'where'));
  },

  removeInput: (lastInputKey) => {
    dispatch(removeInput(lastInputKey, 'where'));
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
