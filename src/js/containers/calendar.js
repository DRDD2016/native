import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Calendar from '../components/calendar';
import { applyFilter, clearFilter } from '../actions/calendar';
import { fetchingEventFromFeedItemRequest } from '../actions/feed';
import { getEvent } from '../actions/event/data';
import filterFeed from '../lib/filter-feed';
import getFutureEvents from '../lib/get-future-events';
import formatMonth from '../lib/format-month';


const mapStateToProps = ({ calendar, user }) => {

  const futureEvents = calendar.data.filter(getFutureEvents);
  const data = calendar.data;
  const filterActive = calendar.filterActive;
  const selectedFilter = calendar.selectedFilter;

  const preFilteredEvents = filterFeed(futureEvents, filterActive, selectedFilter);

  preFilteredEvents.push({ event_id: 'lastItem', when: 'future' });
  preFilteredEvents.unshift({ event_id: 'firstItem', when: 'today' });

  // add month and showMonth to each object in array

  const filteredEvents = preFilteredEvents.map((x, index) => {
    console.log('x.when', x.when);

    const month = () => {
      if (x.event_id === 'firstItem') {
        console.log('isFirstItem');
        return moment().format('MMMM').toUpperCase();
      }
      if (x.event_id === 'lastItem') {
        console.log('isLastItem');
        return false;
      }

      return (
        formatMonth(x.when[0]).toUpperCase()
      );
    };

    x.calendarMonth = month();
    console.log('preFilteredEvents[index - 1]', preFilteredEvents[index - 1] && preFilteredEvents[index - 1]);
    const previousMonth = preFilteredEvents[index - 1] && preFilteredEvents[index - 1].calendarMonth;
    x.showMonth = x.calendarMonth && x.calendarMonth !== previousMonth;
    console.log('x.calendarMonth', x.calendarMonth);
    console.log('x.showMonth', x.showMonth);

    return x;
  });

  // console.log('newFilteredEvents', filteredEvents);


  return {
    // nav,
    allEvents: data,
    filteredEvents,
    calendarIsFetching: calendar.isFetching,
    // isFetchingEvent: feed.isFetchingEvent,
    filterActive,
    selectedFilter,
    user_id: user.user_id
    // isConnected: network.isConnected
  };
};

const mapDispatchToProps = (dispatch, props) => ({

  displaySome: (filterChoice) => {

    dispatch(applyFilter(filterChoice));
  },
  displayAll: () => {

    dispatch(clearFilter());
  },
  createNewEvent: () => { //eslint-disable-line

    props.navigation.navigate('Create');

  },
  handleOnPress: (event_id) => {
    dispatch(fetchingEventFromFeedItemRequest());
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
