import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CalendarItem from './calendar-item';
import FilterPanel from '../general/filter-panel';
import Spinner from '../common/Spinner';
import getUserID from '../../lib/getUserID';
import styles from '../../../styles';
import colours from '../../../styles/colours';

export default class Calendar extends Component {

  static route = {
    navigationBar: {
      title: 'Calendar',
      backgroundColor: colours.blue,
      tintColor: colours.white
    }
  }

  sortedData = this.props.filteredEvents.sort((a, b) => {
    /* eslint-disable no-param-reassign */
    a = a.eventWhen[0].date;
    b = b.eventWhen[0].date;

    return new Date(a).getTime() > new Date(b).getTime();
  });

  render () {
    const { allEvents, isFetching, displaySome, displayAll, calendarIsFiltered, isShowHosting } = this.props;
    return (
      <View>
        {
            isFetching && <Spinner />
        }
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
              this.sortedData.length === 0 && !isFetching &&
                <Text style={styles.smallMessageText}>
                  You have no past or upcoming events events.
                </Text>
            }
            {
              !isFetching && this.sortedData.map((item) => {

                return (
                  <CalendarItem
                    key={ item.event_id }
                    userIsHost={ item.hostID === getUserID() }
                    rsvpStatus={ item.RSVP }
                    eventName={ item.eventName }
                    eventWhat={ item.eventWhat }
                    eventWhere={ item.eventWhere }
                    eventWhen={ item.eventWhen }
                    coverPhoto={ item.coverPhoto }
                    event_id={ item.event_id }
                  />
                );
              })
            }
          </View>
        </ScrollView>
      </View>
    );
  }

}
