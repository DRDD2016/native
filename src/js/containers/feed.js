/* eslint-disable */
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Feed from '../components/feed';
import { applyFilter, clearFilter } from '../actions/feed.old';
import { getEvent } from '../actions/event/data';
import filterFeed from '../lib/filterFeed';
import Router from '../router';

const mapStateToProps = ({ feed }) => {

  const data = feed.data;
  const feedIsFiltered = feed.filter;
  const isShowHosting = feed.showHosting;
  const feedData = filterFeed(data, feedIsFiltered, isShowHosting);

  return {
    allEvents: data,
    feed: feedData,
    isFetching: feed.isFetching,
    feedIsFiltered,
    isShowHosting
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSelection: (event_id) => {
      // need to tell server this feed item was touched
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          dispatch(getEvent(token, event_id));
        }
      })
      ownProps.navigator.push(Router.getRoute('event'));
    },
    displaySome: (filterChoice) => {
      // dispatch(applyFilter(filterChoice));
      console.log('dispatch action');
    },
    displayAll: () => {
      // dispatch(clearFilter());
      console.log('dispatch action');
    }
  };
};


const FeedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);

export default FeedContainer;
