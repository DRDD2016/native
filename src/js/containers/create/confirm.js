import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { saveEvent, clearCreateEvent, shareInviteRequest } from '../../actions/create';
import Confirm from '../../components/create/confirm';
import mapToISOString from '../../lib/map-to-iso-string';
import { store } from '../../init-store';

const mapStateToProps = ({ nav, create, network, user }) => {
  return {
    nav,
    name: create.name,
    description: create.description,
    note: create.note,
    what: create.what,
    where: create.where,
    when: create.when,
    photo_url: user.photo_url,
    isFetching: create.isFetching,
    isConnected: network.isConnected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleOnPress: (navigation) => {
      dispatch(shareInviteRequest());
      console.log('handleOnPress storecreate: ', store.getState().create);
      const event = store.getState().create;

      // sort the event.When dates
      const iSODates = mapToISOString(event.when);
      const sortedWhen = iSODates.sort((a, b) => {
        return (a) > (b);
      });
      console.log('sortedWhen', sortedWhen);

      const data = Object.assign({}, event,
        { when: sortedWhen },
        { is_poll: event.what.concat(event.where, event.when).length > 3 }
      );
      delete data.error;
      delete data.isFetching;
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          console.log('saveEventDispatch');
          dispatch(saveEvent(token, data, navigation));
        }
      })
      .catch(error => console.log(error));
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
