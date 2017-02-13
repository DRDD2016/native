/* eslint-disable */
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Feed from '../components/feed';
import { applyFilter, clearFilter } from '../actions/feed';
import { getEvent } from '../actions/event/data';
import filterFeed from '../lib/filter-feed';
import Router from '../router';

const mapStateToProps = ({ feed }) => {

  const data = feed.data;
  const filterActive = feed.filterActive;
  const selectedFilter = feed.selectedFilter;
  const feedData = filterFeed(data, filterActive, selectedFilter);

  return {
    allEvents: data,
    feed: feedData,
    isFetching: feed.isFetching,
    filterActive,
    selectedFilter
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSelection: (event_id) => {
      // need to tell server this feed item was touched
      console.log('selection', event_id);
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          dispatch(getEvent(token, event_id));
        }
      })
    },
    displaySome: (selectedFilter) => {
      dispatch(applyFilter(selectedFilter));
      console.log('dispatch action');
    },
    displayAll: () => {
      dispatch(clearFilter());
      console.log('dispatch action');
    }
  };
};


const FeedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);

export default FeedContainer;
