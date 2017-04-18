/* eslint-disable*/
import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CalendarItem from './calendar-item';
import FilterPanel from './general/filter-panel';
import Spinner from './common/Spinner';
import Header from './common/Header';
import styles from '../../styles';
import colours from '../../styles/colours';

export default class Calendar extends Component {

  static route = {
    navigationBar: {
      title (params) {
        return params.title;
      },
      backgroundColor: colours.transparent,
      tintColor: colours.white
    }
  }

  renderAlert = () => {
    setTimeout(() => {
      this.props.navigator.showLocalAlert('You are not connected to Internet!', {
        text: { color: '#fff' },
        container: { backgroundColor: 'red' }
      });
    }, 2000);
  }

  render () {
    const { allEvents, isFetching, displaySome, displayAll, filterActive, selectedFilter, user_id, isConnected } = this.props;
    const sortedData = this.props.filteredEvents.sort((a, b) => {
      return a.when[0] > b.when[0];
    });
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flex: 1 }}>
          { !isConnected && this.renderAlert() }
          {
            isFetching && <Spinner />
          }

            {
              !isFetching && allEvents.length > 0 &&
              <FilterPanel
                displaySome={ displaySome }
                displayAll={ displayAll }
                filterActive={ filterActive }
                selectedFilter={ selectedFilter }
              />
            }
          

          <ScrollView>
            <View style={styles.containerFeed}>
              {
                this.props.filteredEvents.length === 0 && !isFetching &&
                <Text style={styles.smallMessageText}>
                  You have no upcoming events.
                </Text>
              }
              {
                !isFetching && sortedData.map((item) => {

                  return (
                    <CalendarItem
                      key={ item.event_id }
                      userIsHost={ item.host_user_id === user_id }
                      rsvpStatus={ item.status }
                      name={ item.name }
                      what={ item.what }
                      where={ item.where }
                      when={ item.when }
                      event_id={ item.event_id }
                      handleOnPress={ this.props.handleOnPress }
                    />
                  );
                })
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}


Calendar.propTypes = {
  allEvents: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  displaySome: PropTypes.func.isRequired,
  displayAll: PropTypes.func.isRequired,
  filterActive: PropTypes.bool.isRequired,
  selectedFilter: PropTypes.string,
  filteredEvents: PropTypes.array.isRequired,
  user_id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  handleOnPress: PropTypes.func.isRequired
};
