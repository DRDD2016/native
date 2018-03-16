import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Calendar from '../components/calendar';
import { applyFilter, clearFilter } from '../actions/calendar';
import { getEvent } from '../actions/event/data';
import filterFeed from '../lib/filter-feed';
import getFutureEvents from '../lib/get-future-events';


const mapStateToProps = ({ nav, calendar, user, network }) => {

  const futureEvents = calendar.data.filter(getFutureEvents);
  const data = calendar.data;
  const filterActive = calendar.filterActive;
  const selectedFilter = calendar.selectedFilter;

  const filteredEvents = filterFeed(futureEvents, filterActive, selectedFilter);

  return {
    nav,
    allEvents: data,
    filteredEvents,
    calendarIsFetching: calendar.isFetching,
    filterActive,
    selectedFilter,
    user_id: user.user_id,
    isConnected: network.isConnected
  };
};

const mapDispatchToProps = (dispatch, props) => ({

  displaySome: (filterChoice) => {

    dispatch(applyFilter(filterChoice));
  },
  displayAll: () => {

    dispatch(clearFilter());
  },
  handleOnPress: (event_id) => {
    AsyncStorage.getItem('spark_token')
    .then((token) => {
      if (token) {
        dispatch(getEvent(token, event_id, props.navigation));
      }
    });
  }
});

const CalendarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);

export default CalendarContainer;
