import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { saveEvent, clearCreateEvent } from '../../actions/create';
import Confirm from '../../components/create/confirm';
import mapToISOString from '../../lib/map-to-iso-string';
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
    saveEvent: () => {
      const event = store.getState().create;
      // TODO
      // add host photo url
      const data = Object.assign({}, event,
        { when: mapToISOString(event.when) },
        { is_poll: event.what.concat(event.where, event.when).length > 3 }
      );
      delete data.error;
      delete data.isFetching;
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          dispatch(saveEvent(token, data));
        }
      })
      .catch(error => console.error(error));
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
