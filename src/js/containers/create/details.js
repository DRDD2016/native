import { connect } from 'react-redux';
import { setDetails, clearCreateEvent } from '../../actions/create';
import Details from '../../components/create/details';

const mapStateToProps = ({ create }) => {
  return {
    name: create.name,
    description: create.description,
    note: create.note,
    title: 'A title'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (text, inputType) => {
      dispatch(setDetails(text, inputType));
    },
    discardEvent: () => {
      dispatch(clearCreateEvent());
    }
  };
};

const DetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Details);

export default DetailsContainer;
