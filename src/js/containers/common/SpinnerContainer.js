import { connect } from 'react-redux';
import SpinnerProvider from '../../components/common/SpinnerProvider';


const mapStateToProps = ({ feed, user, network, create }) => {

  return {
    user_id: user.user_id,
    user_update: user.user_update,
    isConnected: network.isConnected,
    isFetchingFeed: feed.isFetchingFeed,
    isReceivingFeed: feed.isReceivingFeed,
    isTouchedFetching: feed.isTouchedFetching,
    isFetchingEvent: feed.isFetchingEvent,
    isFetchingBranch: network.isFetchingBranch,
    networkIsFetching: network.isFetching,
    push_info: user.push_info,
    eventCode: network.inComingLinkCode,
    eventCodeError: network.inComingLinkError,
    saveEventStatus: create.saveEventStatus
  };
};


const mapDispatchToProps = (/* dispatch, props */) => {
  // const { navigation } = props;
  return {

  };
};


const SpinnerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SpinnerProvider);

export default SpinnerContainer;
