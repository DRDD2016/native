import { connect } from 'react-redux';
import Calendar from '../components/calendar/calendar';
import { applyFilter, clearFilter } from '../actions/calendar';
import filterFeed from '../lib/filterFeed';
import getPastEvents from '../lib/getPastEvents';

const mapStateToProps = (state) => {

  const pastEvents = state.calendar.data.filter(getPastEvents);
  const data = state.calendar.data;
  const calendarIsFiltered = state.calendar.filter;
  const isShowHosting = state.calendar.showHosting;

  const filteredEvents = filterFeed(pastEvents, calendarIsFiltered, isShowHosting);

  return {
    allEvents: data,
    filteredEvents,
    isFetching: state.calendar.isFetching,
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
