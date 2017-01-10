import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import CalendarItem from './calendar-item';
import FilterPanel from '../general/filter-panel';
import Spinner from '../common/Spinner';
import TopBar from '../event/top-bar';
import getUserID from '../../lib/getUserID';
import styles from '../../../styles';

const Calendar = ({ allEvents, filteredEvents, isFetching,
  displaySome, displayAll, calendarIsFiltered, isShowHosting }) => {

  const sortedData = filteredEvents.sort((a, b) => {
    /* eslint-disable no-param-reassign */
    a = a.eventWhen[0].date;
    b = b.eventWhen[0].date;

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
            isShowHosting={ isShowHosting }
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
                  userIsHost={ item.hostID === getUserID() }
                  RSVPstatus={ item.RSVP }
                  eventName={ item.eventName }
                  eventWhat={ item.eventWhat }
                  eventWhere={ item.eventWhere }
                  eventWhen={ item.eventWhen }
                  coverPhoto={ item.coverPhoto }
                  eventID={ item.eventID }
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
