import { connect } from 'react-redux';
import Calendar from '../components/calendar/calendar';
import { applyFilter, clearFilter } from '../actions/calendar';
import filterNotifications from '../lib/filterNotifications';
import getFutureEvents from '../lib/getFutureEvents';
import jsonState from '../testState/jsonState.json';


const mapStateToProps = () => {

  const futureEvents = jsonState.calendar.data.filter(getFutureEvents);
  const data = jsonState.calendar.data;
  const calendarIsFiltered = jsonState.calendar.filter;
  const isShowHosting = jsonState.calendar.showHosting;

  const filteredEvents = filterNotifications(futureEvents, calendarIsFiltered, isShowHosting);

  return {
    allEvents: data,
    filteredEvents,
    isFetching: jsonState.calendar.isFetching,
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
