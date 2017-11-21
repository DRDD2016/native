import PropTypes from 'prop-types';
/* eslint-disable*/
import React, { Component } from 'react';
import { View, Text, ScrollView, ListView, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarItem from './calendar-item';
import FilterPanel from './general/filter-panel';
import Spinner from './common/Spinner';
import Header from './common/Header';
import ImageHeader from './common/ImageHeader';
import HeaderBack from './common/FeedHeaderBackground';
import FeedHeader from './common/FeedHeader';
import styles from '../../styles';
import colours from '../../styles/colours';
import { connectAlert } from './Alert';

class Calendar extends Component {

  static navigationOptions = {
    title: 'Calendar',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="calendar" size={32} color={tintColor} />,
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  }

  componentWillMount () {
    // console.log('calendar compWillMount', this.props);
    const sortedData = this.props.filteredEvents.sort((a, b) => {
      return a.when[0] > b.when[0];
    });
    this.createDataSource(sortedData);

  }

  componentWillReceiveProps (nextProps) {
    // console.log('calendar compWillReceiveNextprops', nextProps);
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

    const { allEvents, isFetching, displaySome, displayAll, filterActive, selectedFilter, user_id, isConnected } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FeedHeader>
          { !isConnected && this.renderAlert() }
          {
            !isFetching && allEvents.length > 0 &&
            <FilterPanel
              displayAll={ displayAll }
              displaySome={ displaySome }
              filterActive={ filterActive }
              selectedFilter={ selectedFilter }
            />
          }
        </FeedHeader>
        <View
          style={{
            flex: 1,
            backgroundColor: colours.white,
            borderBottomWidth: 1,
            borderBottomColor: colours.lightgray }}
        >

          {
            isFetching && <Spinner />
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
