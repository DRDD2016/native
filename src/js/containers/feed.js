import { connect } from 'react-redux';
import Feed from '../components/feed';
import { applyFilter, clearFilter } from '../actions/notifications';
import { updateNotification } from '../actions/event';
import filterNotifications from '../lib/filterNotifications';
import Router from '../router';
import jsonState from '../testState/jsonState.json';

const mapStateToProps = () => {

  const data = jsonState.notifications.data;
  const feedIsFiltered = jsonState.notifications.filter;
  const isShowHosting = jsonState.notifications.showHosting;
  const notifications = filterNotifications(data, feedIsFiltered, isShowHosting);

  return {
    allEvents: data,
    user: jsonState.user,
    notifications,
    isFetching: jsonState.notifications.isFetching,
    updateNotification: jsonState.event.updateNotification,
    feedIsFiltered,
    isShowHosting
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    handleUpdateNotification: (index) => {
      dispatch(updateNotification(index));
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
