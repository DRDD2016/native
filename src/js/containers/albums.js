import { connect } from 'react-redux';
import Calendar from '../components/calendar/calendar';
import { applyFilter, clearFilter } from '../actions/calendar';
import filterNotifications from '../lib/filterNotifications';
import getPastEvents from '../lib/getPastEvents';
import jsonState from '../testState/jsonState.json';

const mapStateToProps = () => {

  const pastEvents = jsonState.calendar.data.filter(getPastEvents);
  const data = jsonState.calendar.data;
  const calendarIsFiltered = jsonState.calendar.filter;
  const isShowHosting = jsonState.calendar.showHosting;

  const filteredEvents = filterNotifications(pastEvents, calendarIsFiltered, isShowHosting);

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


const AlbumsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);

export default AlbumsContainer;
