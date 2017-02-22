/* eslint-disable */
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Feed from '../components/feed';
import { applyFilter, clearFilter, feedItemTouched } from '../actions/feed';
import { getEvent } from '../actions/event/data';
import filterFeed from '../lib/filter-feed';
import Router from '../router';

const mapStateToProps = ({ feed, user }) => {

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
    user_id: user.user_id
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSelection: (event_id, viewed, feed_item_id) => {
      // need to tell server this feed item was touched
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          dispatch(getEvent(token, event_id));
          console.log('ID', feed_item_id);
          !viewed && dispatch(feedItemTouched(token, feed_item_id));
        }
      })
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
