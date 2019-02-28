import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Feed from '../components/feed';
import {
  applyFilter,
  clearFilter,
  feedItemTouched,
  haveFeedRequest,
  haveFeedSuccess,
  haveFeedFailure,
  fetchingEventFromFeedItemRequest } from '../actions/feed';
import { getEvent, submitCode } from '../actions/event/data';
import { updateOpenNo } from '../actions/profile';
import { deleteIncomingLink, linkDatafromBranch, saveIncomingLinkError } from '../actions/network';
import filterFeed from '../lib/filter-feed';


const mapStateToProps = ({ nav, feed, user, network, create }) => {

  const data = feed.data;
  const filterActive = feed.filterActive;
  const selectedFilter = feed.selectedFilter;
  const feedData = filterFeed(data, filterActive, selectedFilter);
  return {
    nav,
    filterActive,
    selectedFilter,
    user_id: user.user_id,
    isConnected: network.isConnected,
    allEvents: data,
    feed: feedData,
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
    user_updateNo: user.user_update_no,
    user_openNo: user.user_open_no
  };
};
const mapDispatchToProps = (dispatch, props) => {
  const { navigation } = props;
  return {
    handleSelection: (event_id, viewed, feed_item_id) => {
      console.log(`feed item touched handleSelection: event_id: ${event_id}, viewed: ${viewed}, id: ${feed_item_id}`);
      // need to tell server this feed item was touched

      dispatch(fetchingEventFromFeedItemRequest());
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          dispatch(getEvent(token, event_id, navigation));
          if (!viewed) {
            dispatch(feedItemTouched(token, feed_item_id));
          }
        }
      });
    },
    handleSubmitCode: (code) => { //eslint-disable-line
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          console.log('submittingCode feed container');
          // dispatch(deleteIncomingLink());
          dispatch(submitCode(token, code, props.navigation));
        }
      })
      .catch(error => console.error(error));

    },
    createNewEvent: () => { //eslint-disable-line

      props.navigation.navigate('Create');

    },
    linkDatafromBranch: () => { //eslint-disable-line
      dispatch(linkDatafromBranch());
    },
    stopFetchingLink: () => { //eslint-disable-line

      dispatch(deleteIncomingLink()); // is this still used?

    },
    haveFeedRequest: () => {
      dispatch(haveFeedRequest());
    },
    haveFeedSuccess: () => {
      dispatch(haveFeedSuccess());
    },
    haveFeedFailure: () => {
      dispatch(haveFeedFailure());
    },
    saveIncomingLinkError: (error) => {
      dispatch(saveIncomingLinkError(error));
    },
    displaySome: (selectedFilter) => {
      dispatch(applyFilter(selectedFilter));
    },
    displayAll: () => {
      dispatch(clearFilter());
    },
    onAppLoad: (prev_user_open_no) => {

      AsyncStorage.getItem('spark_token')
      .then((token) => {
        AsyncStorage.getItem('spark_user_id')
        .then((user_id) => {
          if (token && user_id) {

            const user_open_no = (prev_user_open_no !== undefined || null) ? prev_user_open_no + 1 : 1;
            console.log('user_open_no updating to:', user_open_no);

            dispatch(updateOpenNo(token, user_id, user_open_no));
            // and dispatch action to set user Open No to current Open No + 1
          }
        });
      });
    }
  };
};


const FeedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);

export default FeedContainer;
