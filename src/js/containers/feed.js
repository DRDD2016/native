import { connect } from 'react-redux';
import Feed from '../components/feed';
import { applyFilter, clearFilter } from '../actions/feed';
import { getEvent } from '../actions/event/data';
import { updateFeedItem } from '../actions/event';
import filterFeed from '../lib/filterFeed';
import Router from '../router';
import jsonState from '../testState/jsonState.json';

const mapStateToProps = () => {

  const data = jsonState.feed.data;
  const feedIsFiltered = jsonState.feed.filter;
  const isShowHosting = jsonState.feed.showHosting;
  const feed = filterFeed(data, feedIsFiltered, isShowHosting);

  return {
    allEvents: data,
    user: jsonState.user,
    feed,
    isFetching: jsonState.feed.isFetching,
    updateFeedItem: jsonState.event.updateFeedItem,
    feedIsFiltered,
    isShowHosting
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const event_id = 1;
  return {
    handleSelection: (index) => {
      dispatch(updateFeedItem(index));
      dispatch(getEvent(event_id));
      ownProps.navigator.push(Router.getRoute('event'));
    },
    displaySome: (filterChoice) => {
      dispatch(applyFilter(filterChoice));
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
