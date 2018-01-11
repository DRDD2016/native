import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Feed from '../components/feed';
import { applyFilter, clearFilter, feedItemTouched } from '../actions/feed';
import { getEvent, submitCode } from '../actions/event/data';
import { deleteIncomingLink, linkDatafromBranch } from '../actions/network';
import filterFeed from '../lib/filter-feed';


const mapStateToProps = ({ nav, feed, user, network, create, event }) => {

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
    isFetching: feed.isFetching,
    networkIsFetching: network.isFetching,
    eventIsFetching: event.data.isFetching,
    isFetchingBranch: network.isFetchingBranch,
    push_info: user.push_info,
    eventCode: network.inComingLinkCode,
    eventCodeError: network.inComingLinkError,
    saveEventDone: create.saveEventDone
  };
};
const mapDispatchToProps = (dispatch, props) => {
  const { navigation } = props;
  return {
    handleSelection: (event_id, viewed, feed_item_id) => {
      console.log(`feed item touched handleSelection: event_id: ${event_id}, viewed: ${viewed}, id: ${feed_item_id}`);
      // need to tell server this feed item was touched
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
    displaySome: (selectedFilter) => {
      dispatch(applyFilter(selectedFilter));
    },
    displayAll: () => {
      dispatch(clearFilter());
    }
  };
};


const FeedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);

export default FeedContainer;
