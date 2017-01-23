import { connect } from 'react-redux';
import Calendar from '../components/calendar/calendar';
import { applyFilter, clearFilter } from '../actions/calendar.old';
import filterFeed from '../lib/filterFeed';
import getFutureEvents from '../lib/getFutureEvents';


const mapStateToProps = ({ calendar }) => {

  const futureEvents = calendar.data.filter(getFutureEvents);
  const data = calendar.data;
  const calendarIsFiltered = calendar.filter;
  const isShowHosting = calendar.showHosting;

  const filteredEvents = filterFeed(futureEvents, calendarIsFiltered, isShowHosting);

  return {
    allEvents: data,
    filteredEvents,
    isFetching: calendar.isFetching,
    calendarIsFiltered,
    isShowHosting
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
