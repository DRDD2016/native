import { connect } from 'react-redux';
import { setDetails } from '../../actions/create';
import Note from '../../components/create/note';

const mapStateToProps = ({ create }) => {
  return {
    name: create.name,
    note: create.note
  };
};

const mapDispatchToProps = dispatch => ({

  handleChange: (text, category) => {
    dispatch(setDetails(text, category));
  }

});

const NoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Note);

export default NoteContainer;
