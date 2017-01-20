import { connect } from 'react-redux';
import { newEvent, clearCreateEvent } from '../../actions/create';
import Confirm from '../../components/create/confirm';
import { store } from '../../init-store';


const mapStateToProps = ({ create }) => {
  return {
    name: create.name,
    description: create.description,
    note: create.note,
    what: create.what,
    where: create.where,
    when: create.when
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveEvent: (data) => {
      const state = store.getState();
      // data.hostID = state.user.id;
      // data.hostPhotoURL = state.user.photo_url;
      dispatch(newEvent(data));
    },
    discardEvent: () => {
      dispatch(clearCreateEvent());
    }
  };
};

const ConfirmContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Confirm);

export default ConfirmContainer;
