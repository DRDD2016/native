import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { View, Text, FlatList, Dimensions, Platform, Image, Animated, InteractionManager } from 'react-native';
import Fabric from 'react-native-fabric';
import CalendarItem from './calendar-item';
import FilterPanel from './general/filter-panel';
import Spinner from './common/Spinner';
import FeedHeader from './common/FeedHeader';
import DropdownView from './common/DropdownView';
import styles from '../../styles';
import colours from '../../styles/colours';
// import { connectAlert } from './Alert';
import ButtonHeader from './common/ButtonHeader';
import BurgerIcon from './common/burger-icon';
import OfflineIconContainer from '../containers/common/OfflineIconContainer';
import { scale } from '../../styles/scaling';

const { Answers } = Fabric;
const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.8 : Header.HEIGHT * 0.8;
const logo = require('../../img/sparkLoginLogo.png');

const NAVBAR_HEIGHT = scale(50);
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Calendar extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ButtonHeader />,
    headerRight: <View style={{ flexDirection: 'row', alignItems: 'center' }}>

      <OfflineIconContainer />
      <ButtonHeader
        onPress={() => navigation.openDrawer()}
      >
        <BurgerIcon />
      </ButtonHeader>
    </View>,
    headerStyle: { backgroundColor: colours.headerBackgroundColor },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />
    </View>

  });


  constructor (props) {
    super(props);

    // animated scrolling filterPanel

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      isReady: false,
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp'
          }),
          offsetAnim,
        ),
        0,
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      )
    };
  }

  componentWillMount () {
    // console.log('calendar compWillMount', this.props);
    // console.log('calendar this.props.filteredEvents', this.props.filteredEvents);
    const data = this.props.filteredEvents;
    this.createDataSource(data);

  }

  componentDidMount () {

    console.log('calendar DidMount');

    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      // 2: Component is done animating
      // 3: Start fetching the team / or render the view
      // this.props.dispatchTeamFetchStart();

      console.log('calendar Did Mount - interactions finished - expensive code starts');

      // expensive code starting

      Answers.logCustom('Calendar.js Mounted', { additionalData: 'nothing' });

      // animated scrolling FilterPanel

      this.state.scrollAnim.addListener(({ value }) => {
        // This is the same calculations that diffClamp does.
        const diff = value - this._scrollValue;
        this._scrollValue = value;
        this._clampedScrollValue = Math.min(
          Math.max(this._clampedScrollValue + diff, 0),
          NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
        );
      });
      this.state.offsetAnim.addListener(({ value }) => {
        this._offsetValue = value;
      });

      // expensive code finished

      console.log('calendar Did Mount - expensive code finished');

      this.setState({
        isReady: true
      });
    });


  }

  componentWillReceiveProps (nextProps) {

    console.log('calendar WillReceiveProps');
    this.setState({
       isReady: false
    });
    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      // 2: Component is done animating
      // 3: Start fetching the team / or render the view
      // this.props.dispatchTeamFetchStart();

      console.log('calendar WillReceiveProps - interactions finished - expensive code starts');

      // expensive code starting after interactions finished

      const data = nextProps.filteredEvents;
      this.createDataSource(data);

      // expensive code finished

      console.log('calendar WillReceiveProps - expensive code finished');

      this.setState({
         isReady: true
      });
    });

  }

  componentWillUnmount () {
    // Don't forget to remove the listeners!
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;


  createDataSource (calendar) {
    this.dataSource = calendar;
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue = this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
      ? this._offsetValue + NAVBAR_HEIGHT
      : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true
    }).start();
  };


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

    console.log('renderCalendar');

    if (!this.state.isReady) {
      console.log('renderCalendarActivityIndicator');
      return (
        <View style={{ backgroundColor: colours.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}><Spinner /></View>
      );
    }

    console.log('renderCalendarContent');

    const timestamp = new Date();
    console.log('renderCalendar:', timestamp.getTime());

    const { width } = Dimensions.get('window'); // inline style to force render on screen rotation
    const scaledWidth = width > 700 ? (width * 0.90) : (width * 1);

    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: 'clamp'
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });


    const { allEvents, calendarIsFetching, displaySome, displayAll, filterActive, selectedFilter } = this.props;

    Answers.logCustom('Calendar.js render'); // eslint-disable-line max-len

    return (
      <View style={{ flex: 1, backgroundColor: colours.background }}>
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}>

          <FeedHeader />

        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            width: scaledWidth,
            backgroundColor: 'transparent',
            borderBottomWidth: 1,
            borderBottomColor: colours.lightgray }}
        >

          <View>


            {
              !calendarIsFetching && this.dataSource &&
              <View style={{ backgroundColor: 'transparent' }}>
                <DropdownView
                  navbarHeight={NAVBAR_HEIGHT}
                  navbarOpacity={navbarOpacity}
                  navbarTranslate={navbarTranslate}
                >
                  {
                    !calendarIsFetching && allEvents.length > 0 &&
                    <FilterPanel
                      displayAll={ displayAll }
                      displaySome={ displaySome }
                      filterActive={ filterActive }
                      selectedFilter={ selectedFilter }
                    />
                  }

                </DropdownView>

                <AnimatedFlatList
                  initialNumToRender={10}
                  data={this.dataSource}
                  extraData={this.state}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.event_id.toString()}
                  scrollEventThrottle={1}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
                    { useNativeDriver: true },
                  )}
                  onMomentumScrollBegin={this._onMomentumScrollBegin}
                  onMomentumScrollEnd={this._onMomentumScrollEnd}
                  onScrollEndDrag={this._onScrollEndDrag}
                  contentContainerStyle={{ backgroundColor: 'transparent', paddingTop: NAVBAR_HEIGHT }}
                />
              </View>

            }

            {
              this.props.filteredEvents.length === 0 && !calendarIsFetching &&
              <View style={[styles.containerFeed, { alignItems: 'center' }]}>
                <Text style={[styles.msg3, { marginTop: 80, marginHorizontal: 15 }]}>
                  You have no upcoming events.
                </Text>
              </View>
            }

          </View>
        </View>
      </View>
    );
  }
}


Calendar.propTypes = {
  // allEvents: PropTypes.array.isRequired,
  calendarIsFetching: PropTypes.bool.isRequired,
  displaySome: PropTypes.func.isRequired,
  displayAll: PropTypes.func.isRequired,
  filterActive: PropTypes.bool.isRequired,
  // selectedFilter: PropTypes.string,
  // filteredEvents: PropTypes.array.isRequired,
  user_id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  handleOnPress: PropTypes.func.isRequired
};

// export default connectAlert(Calendar);
export default Calendar;
