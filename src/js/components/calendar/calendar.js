import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import CalendarItem from './calendar-item';
import FilterPanel from '../general/filter-panel';
import Spinner from '../common/Spinner';
import TopBar from '../event/top-bar';
import styles from '../../../styles';

const user_id = 1;

const Calendar = ({ allEvents, filteredEvents, isFetching,
  displaySome, displayAll, calendarIsFiltered }) => {

  const sortedData = filteredEvents.sort((a, b) => {
    /* eslint-disable no-param-reassign */
    a = a._when[0].date;
    b = b._when[0].date;

    return new Date(a).getTime() > new Date(b).getTime();
  });

  return (

    <View>
      {
          isFetching && <Spinner />
      }
      <TopBar location="calendar" />
      <View style={styles.filterPanelContainer}>
        {
          !isFetching && allEvents.length > 0 && <FilterPanel
            displaySome={ displaySome }
            displayAll={ displayAll }
            dataIsFiltered={ calendarIsFiltered }
            isShowHosting={ '1' == 1 }
          />
        }
      </View>

      <ScrollView>
        <View style={styles.containerFeed}>
          {
            sortedData.length === 0 && !isFetching &&
              <Text style={styles.smallMessageText}>
                You have no past or upcoming events events.
              </Text>
          }
          {
            !isFetching && sortedData.map((item, i) => {

              return (
                <CalendarItem
                  key={ i }
                  userIsHost={ item.host_id === user_id }
                  rsvpStatus={ item.RSVP }
                  name={ item.name }
                  what={ item._what }
                  where={ item._where }
                  when={ item._when }
                  event_id={ item.event_id }
                />
              );
            })
          }
        </View>
      </ScrollView>

    </View>
  );
};

export default Calendar;
