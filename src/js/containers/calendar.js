import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Calendar from '../components/calendar';
import { applyFilter, clearFilter } from '../actions/calendar';
import { getEvent } from '../actions/event/data';
import filterFeed from '../lib/filter-feed';
import getFutureEvents from '../lib/get-future-events';


const mapStateToProps = ({ calendar }) => {
  const futureEvents = calendar.data.filter(getFutureEvents);
  const data = calendar.data;
  const filterActive = calendar.filterActive;
  const selectedFilter = calendar.selectedFilter;

  const filteredEvents = filterFeed(futureEvents, filterActive, selectedFilter);
  return {
    allEvents: data,
    filteredEvents,
    isFetching: calendar.isFetching,
    filterActive,
    selectedFilter
  };
};

const mapDispatchToProps = dispatch => ({

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
        dispatch(getEvent(token, event_id));
      }
    });
  }
});

const CalendarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);

export default CalendarContainer;
