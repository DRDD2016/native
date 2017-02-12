/* eslint-disable*/
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CalendarItem from './calendar-item';
import FilterPanel from './general/filter-panel';
import Spinner from './common/Spinner';
import styles from '../../styles';
import colours from '../../styles/colours';

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

  render () {
    const { allEvents, isFetching, displaySome, displayAll, filterActive, selectedFilter } = this.props;
    const sortedData = this.props.filteredEvents.sort((a, b) => {
      return a.when[0] > b.when[0];
    });

    return (
      <View>
        {
          isFetching && <Spinner />
        }
        <View style={styles.filterPanelContainer}>
          {
            !isFetching && allEvents.length > 0 &&
            <FilterPanel
              displaySome={ displaySome }
              displayAll={ displayAll }
              filterActive={ filterActive }
              selectedFilter={ selectedFilter }
            />
          }
        </View>

        <ScrollView>
          <View style={styles.containerFeed}>
            {
              this.props.filteredEvents.length === 0 && !isFetching &&
                <Text style={styles.smallMessageText}>
                  You have no past or upcoming events events.
                </Text>
            }
            {
              !isFetching && sortedData.map((item) => {

                return (
                  <CalendarItem
                    key={ item.event_id }
                    userIsHost={ item.host_id === user_id }
                    rsvpStatus={ item.RSVP }
                    name={ item.name }
                    what={ item.what }
                    where={ item.where }
                    when={ item.when }
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
