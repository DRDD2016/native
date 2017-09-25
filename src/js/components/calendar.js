import PropTypes from 'prop-types';
/* eslint-disable*/
import React, { Component } from 'react';
import { View, Text, ScrollView, ListView, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarItem from './calendar-item';
import FilterPanel from './general/filter-panel';
import Spinner from './common/Spinner';
import Header from './common/Header';
import styles from '../../styles';
import colours from '../../styles/colours';
import { connectAlert } from './Alert';

class Calendar extends Component {

  static navigationOptions = {
    title: 'Calendar',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="calendar" size={32} color={tintColor} />,
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor
  }

  componentWillMount () {
    console.log('calendar compWillMount', this.props);
    const sortedData = this.props.filteredEvents.sort((a, b) => {
      return a.when[0] > b.when[0];
    });
    this.createDataSource(sortedData);

  }

  componentWillReceiveProps (nextProps) {
    console.log('calendar compWillReceiveNextprops', nextProps);
    const sortedData = nextProps.filteredEvents.sort((a, b) => {
      return a.when[0] > b.when[0];
    });
    this.createDataSource(sortedData);
    
  }

  createDataSource (calendar) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(calendar);
  }

  renderAlert = () => {
    setTimeout(() => {
      this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
    }, 2000);
  }

  renderRow = (rowData, rowID) => {
    const item = rowData;
    const { user_id, handleOnPress } = this.props;

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
  }

  render () {
    console.log('calendar RenderProps', this.props);

    const { allEvents, isFetching, displaySome, displayAll, filterActive, selectedFilter, user_id, isConnected } = this.props;

    return (
      <View
        style={[
          styles.headerBuffer,
          { backgroundColor: colours.white }]}
      >
        <Header style={{ marginTop: Platform.OS === 'ios' ? null : 70 }} />
        <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? null : 70 }}>
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

              {
                this.props.filteredEvents.length === 0 && !isFetching &&
                <View style={[styles.containerFeed, { alignItems: 'center' }]}>
                  <Text style={[styles.msg3, { marginTop: 80, marginHorizontal: 15 }]}>
                    You have no upcoming events.
                  </Text>
                </View>
              }

              {
                !isFetching && this.dataSource &&
                <View style={styles.containerFeed}>
                  <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                    removeClippedSubviews={false}
                  />
                </View>
              }

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

export default connectAlert(Calendar);
