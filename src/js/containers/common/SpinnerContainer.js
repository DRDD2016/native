import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import SpinnerProvider from '../../components/common/SpinnerProvider';


const mapStateToProps = ({ feed, user, network, create, event }) => {

  // console.log('Spinner mapState state:');
  // console.log('feed:', feed);
  // console.log('user:', user);
  // console.log('network:', network);
  // console.log('dispatch create:', create);
  // console.log('event:', event);

  return {
    user_id: user.user_id,
    user_update: user.user_update,
    isConnected: network.isConnected,
    isFetchingFeed: feed.isFetchingFeed,
    isReceivingFeed: feed.isReceivingFeed,
    isTouchedFetching: feed.isTouchedFetching,
    isFetchingEvent: feed.isFetchingEvent,
    isFetchingBranch: network.isFetchingBranch,
    // networkIsFetching: network.isFetching, // remove as not used and may cause unnecessary updates
    push_info: user.push_info,
    eventCode: network.inComingLinkCode,
    eventCodeError: network.inComingLinkError,
    saveEventStatus: create.saveEventStatus,
    isFetchingCreate: create.isFetching,
    isConfirmingEvent: event.poll.isConfirmingEvent,
    finalChoices: event.poll.finalChoices,
    isEventConfirmed: create.isEventConfirmed
  };
};


const mapDispatchToProps = (dispatch) => {
  // const { navigation } = props;
  console.log('Spinner mapDispatch');

  return {

    goBack: () => { //eslint-disable-line
      dispatch(NavigationActions.back(null));
    }

  };
};


const SpinnerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SpinnerProvider);

export default SpinnerContainer;
