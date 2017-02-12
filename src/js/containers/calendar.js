import { connect } from 'react-redux';
import Calendar from '../components/calendar';
import { applyFilter, clearFilter } from '../actions/calendar.old';
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
  }
});

const CalendarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);

export default CalendarContainer;
