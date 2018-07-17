import PropTypes from 'prop-types';
/* eslint-disable*/
import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { View, Text, FlatList, Dimensions, Platform, Image } from 'react-native';
import Fabric from 'react-native-fabric';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarItem from './calendar-item';
import FilterPanel from './general/filter-panel';
import ImageHeader from './common/ImageHeader';
import FeedHeader from './common/FeedHeader';
import styles from '../../styles';
import colours from '../../styles/colours';
import { connectAlert } from './Alert';
import ButtonHeader from './common/ButtonHeader';
import BurgerIcon from './common/burger-icon';

const { Answers } = Fabric;
const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.8 : Header.HEIGHT * 0.8;
const logo = require('../../img/sparkLoginLogo.png');

class Calendar extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ButtonHeader />,
    headerRight: <ButtonHeader
      onPress={() => navigation.openDrawer()}
    >
      <BurgerIcon />
    </ButtonHeader>,
    headerStyle: { backgroundColor: colours.headerBackgroundColor },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />
    </View>

  });

  constructor (props) {
    super(props);

    this.state = {
      isModalVisible: false
    };

  }

  componentWillMount () {
    // console.log('calendar compWillMount', this.props);
    // console.log('calendar this.props.filteredEvents', this.props.filteredEvents);
    const data = this.props.filteredEvents;
    this.createDataSource(data);

  }

  componentDidMount () {
    Answers.logCustom('Calendar.js Mounted', { additionalData: 'nothing' });
  }

  componentWillReceiveProps (nextProps) {
    // console.log('calendar compWillReceiveNextprops', nextProps);
    // console.log('calendar this.props.filteredEvents', nextProps.filteredEvents);
    let timestamp = new Date();
    console.log('cal receivesProps:', timestamp.getTime());

    const data = nextProps.filteredEvents;
    this.createDataSource(data);
    timestamp = new Date();
    console.log('cal receivesProps dataSource created:', timestamp.getTime());

  }

  createDataSource (calendar) {
    this.dataSource = calendar;
  }

  renderAlert = () => {
    setTimeout(() => {
      this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
    }, 2000);
  }

  renderItem = (item) => {

    const { event_id, host_user_id, status, name, what, where, when, cancelled, is_poll, host_firstname, host_photo_url, rsvps } = item.item;
    const { user_id, handleOnPress } = this.props;
    // console.log('event_id', event_id);

    return (

      <CalendarItem
        oldKey={ `${event_id}${Math.random()}` }
        userIsHost={ host_user_id === user_id }
        rsvpStatus={ status }
        name={ name }
        what={ what }
        where={ where }
        when={ when }
        event_id={ event_id }
        handleOnPress={ handleOnPress }
        isCancelled={ cancelled }
        is_poll={ is_poll }
        host_firstname={host_firstname}
        host_photo_url={host_photo_url}
        rsvps={rsvps}
      />

    );
  }

  render () {

    const timestamp = new Date();
    console.log('renderCalendar:', timestamp.getTime());

    const { width } = Dimensions.get('window'); // inline style to force render on screen rotation
    const scaledWidth = width > 700 ? (width * 0.90) : (width * 1);

    const { allEvents, calendarIsFetching, displaySome, displayAll, filterActive, selectedFilter, isConnected } = this.props;

    Answers.logCustom('Calendar.js render'); // eslint-disable-line max-len

    return (
      <View style={{ flex: 1 }}>
        <FeedHeader>
          { !isConnected && this.renderAlert() }
          {
            !calendarIsFetching && allEvents.length > 0 &&
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
            alignSelf: 'center',
            width: scaledWidth,
            backgroundColor: colours.white,
            borderBottomWidth: 1,
            borderBottomColor: colours.lightgray }}
        >

          <View>

            {
              this.props.filteredEvents.length === 0 && !calendarIsFetching &&
              <View style={[styles.containerFeed, { alignItems: 'center' }]}>
                <Text style={[styles.msg3, { marginTop: 80, marginHorizontal: 15 }]}>
                  You have no upcoming events.
                </Text>
              </View>
            }

            {
              !calendarIsFetching && this.dataSource &&
              <View style={styles.containerFeed}>
                <FlatList
                  data={this.dataSource}
                  extraData={this.state}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.event_id.toString()}
                />
              </View>
            }

          </View>
        </View>
      </View>
    );
  }
}


Calendar.propTypes = {
  allEvents: PropTypes.array.isRequired,
  calendarIsFetching: PropTypes.bool.isRequired,
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
