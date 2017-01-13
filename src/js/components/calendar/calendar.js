/* eslint-disable*/
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CalendarItem from './calendar-item';
import FilterPanel from '../general/filter-panel';
import Spinner from '../common/Spinner';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const user_id = 1;
export default class Calendar extends Component {

  static route = {
    navigationBar: {
      title (params) {
        return params.title;
      },
      backgroundColor: colours.blue,
      tintColor: colours.white
    }
  }

  sortedData = this.props.filteredEvents.sort((a, b) => {
    /* eslint-disable no-param-reassign */
    a = a._when[0].date;
    b = b._when[0].date;

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
              isShowHosting={ '1' == 1 }
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
  }
}
