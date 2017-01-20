import { connect } from 'react-redux';
import Feed from '../components/feed';
import { applyFilter, clearFilter } from '../actions/feed';
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
  const event_id = 1;
  return {
    handleSelection: (index) => {
      // need to tell server this feed item was touched
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
