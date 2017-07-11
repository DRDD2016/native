import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Feed from '../components/feed';
import { applyFilter, clearFilter, feedItemTouched } from '../actions/feed';
import { getEvent, submitCode } from '../actions/event/data';
// import { deleteIncomingLink } from '../actions/network';
import filterFeed from '../lib/filter-feed';


const mapStateToProps = ({ feed, user, network }) => {

  const data = feed.data;
  const filterActive = feed.filterActive;
  const selectedFilter = feed.selectedFilter;
  const feedData = filterFeed(data, filterActive, selectedFilter);
  return {
    allEvents: data,
    feed: feedData,
    isFetching: feed.isFetching,
    filterActive,
    selectedFilter,
    user_id: user.user_id,
    push_info: user.push_info,
    isConnected: network.isConnected,
    eventCode: network.inComingLinkCode
  };
};
const mapDispatchToProps = (dispatch, props) => {
  const { navigation } = props;
  return {
    handleSelection: (event_id, viewed, feed_item_id) => {
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
          // dispatch(deleteIncomingLink());
          dispatch(submitCode(token, code, props.navigation));
        }
      })
      .catch(error => console.error(error));

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
