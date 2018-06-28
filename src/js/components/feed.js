import React, { Component } from 'react';
import { Animated, View, Text, TouchableHighlight, FlatList, Image, Platform, Dimensions } from 'react-native';
import Fabric from 'react-native-fabric';
import _ from 'lodash';
import { Header } from 'react-navigation';
// import Icon from 'react-native-vector-icons/FontAwesome';
import FeedItem from './feed-item';
import FilterPanel from './general/filter-panel';
import Spinner from './common/Spinner';
// import ImageHeader from './common/ImageHeader';
import styles from '../../styles';
import colours from '../../styles/colours';
import { connectAlert } from './Alert';
import ButtonHeader from './common/ButtonHeader';
import BurgerIcon from './common/burger-icon';
import { store } from '../init-store';
import { getFeedFailure } from '../actions/feed';
import WhatsNew, { app_updateNo } from './onboarding/whatsnew';
import { scale } from '../../styles/scaling';

const { Answers } = Fabric;

const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.8 : Header.HEIGHT * 0.8;
const logo = require('../../img/sparkLoginLogo.png');

const NAVBAR_HEIGHT = scale(50);
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// import { subscribeToBranchLinks } from '../lib/branchLink';

class Feed extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ButtonHeader />,
    headerRight: <ButtonHeader
      onPress={() => navigation.openDrawer()}
    >
      <BurgerIcon />
    </ButtonHeader>,
    headerStyle: { justifyContent: 'center', alignItems: 'center', backgroundColor: colours.headerBackgroundColor },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />
    </View>
  });

  constructor (props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
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

    const { handleSubmitCode, eventCode, haveFeedRequest, onAppLoad, user_openNo } = this.props;

    onAppLoad(user_openNo);

    haveFeedRequest();

    console.log('FeedWillMountprops: ', this.props);
    const timestamp = new Date();
    console.log('Feed WillMount:', timestamp.getTime());


    // console.log('eventCode FeedMount:', eventCode);
    if (eventCode) {
      if (eventCode !== 'none') {
        // console.log('submittingEventCode from Feed');
        handleSubmitCode(eventCode);
      }
    }

    // console.log('Mount this.props.eventCodeError: ', this.props.eventCodeError);

    if (this.props.eventCodeError) {
      console.log('dispatching getFeedFailure: ');
      store.dispatch(getFeedFailure(this.props.eventCodeError));
      // this.setState({ isModalVisible: true });

    }

  }

  componentDidMount () {

    Answers.logCustom('Feed.js Mounted', { additionalData: 'nothing' });
    const timestamp = new Date();
    console.log('FeedDidMount:', timestamp.getTime());

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

  }

  componentWillReceiveProps (nextProps) {

    console.log('Feed Receives NextProps');
    console.log('thisProps', this.props);
    console.log('NextProps', nextProps);
    const timestamp = new Date();
    console.log('Feed receivesProps:', timestamp.getTime());

    const { handleSubmitCode } = this.props;
    const { eventCode, saveEventStatus } = nextProps;

    console.log('saveEventStatus thisprops: ', this.props.saveEventStatus);

    console.log('saveEventStatus Nextprops: ', saveEventStatus);

    console.log('eventCode FeedNextProps:', eventCode);


    if (eventCode) {
      if (this.props.eventCode !== eventCode) {
        if (eventCode !== 'none') {
          console.log('submittingEventCode from Feed nextProps');
          handleSubmitCode(eventCode);
          // linkDatafromBranch(); // should we delay this until after submitCode has started?
        }
      }
    }

    console.log('this.props.eventCodeError: ', this.props.eventCodeError);


    const { feed } = nextProps;
    const newData = [].concat(feed).reverse();
    console.log('newData', newData);

    const uniqueFeedData = _.uniqBy(newData, 'feed_item.feed_tag');
      // const itemTag = `Tag_${item.event_id}_${item.subject_user_id}`;
      // console.log('itemTag:', itemTag);
      // console.log('index:', index);
      // console.log('self:', self);

    this.createDataSource(uniqueFeedData);


  }

  componentDidUpdate () {
    const { isFetchingFeed, allEvents, haveFeedSuccess, haveFeedFailure } = this.props;
    console.log('feed didUpdate isFetchingFeed: ', isFetchingFeed);
    console.log('allEvents: ', allEvents);
    if (isFetchingFeed) {
      if (allEvents.length > 0) {
        console.log('fetchFeedSuccess');
        haveFeedSuccess();
      } else {
        console.log('fetchFeedFailure');
        haveFeedFailure();
      }
    }
  }

  componentWillUnmount () {
    // Don't forget to remove the listeners!
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  createDataSource (feed) {
    this.dataSource = feed;
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

  renderAlert = () => {
    setTimeout(() => {
      this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
    }, 2000);
  }

  renderItem = (item) => {

    const { index } = item;
    const { feed_item, id } = item.item;
    const { user_id, handleSelection } = this.props;
    // console.log('feed_item', feed_item);

    return (
      <FeedItem
        user_id={ user_id }
        key={ `${id}${Math.random()}` }
        index={ index }
        event_id={ feed_item.event_id }
        timestamp={ feed_item.timestamp }
        name={ feed_item.name }
        is_poll={ feed_item.is_poll }
        what={ feed_item.what }
        where={ feed_item.where }
        when={ feed_item.when }
        userIsHost={ feed_item.host_user_id === user_id }
        hostID={ feed_item.host_user_id }
        firstname={ feed_item.firstname }
        surname={ feed_item.surname }
        photo_url={ feed_item.photo_url }
        subject_user_id={ feed_item.subject_user_id }
        viewed={ feed_item.viewed }
        edited={ feed_item.edited }
        isCancelled={ feed_item.cancelled }
        handleSelection={ handleSelection }
        feed_item_id={ id }
        action={ feed_item.action }
        feed_tag={ feed_item.feed_tag }
      />
    );
  }


  render () {

    const timestamp = new Date();
    console.log('Feed render:', timestamp.getTime());
    console.log('Feed render props:', this.props);

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

    const {
      allEvents,
      feed,
      isReceivingFeed,
      displaySome,
      displayAll,
      filterActive,
      selectedFilter,
      createNewEvent,
      user_updateNo,
      user_openNo,
      eventCode
      // isConnected
    } = this.props;

    let showWhatsNew = false;

    if ((eventCode === 'none') || (!eventCode)) {
      if (user_updateNo !== undefined) {
        if (user_updateNo < app_updateNo) {
          // if an old updateNo, then show whatsnew
          showWhatsNew = true;
        } else {
          showWhatsNew = false;
        }
      } else {
        showWhatsNew = false;
      }
    } else {
      showWhatsNew = false;
    }

    let showWelcome = false;

    if ((eventCode === 'none') || (!eventCode)) {
      if (user_updateNo === undefined) {
        // if no updateNo, then its a new user, so show welcome (in whatsnew for now)
        showWelcome = true;
      } else {
        showWelcome = false;
      }
    } else {
      showWelcome = false;
    }
    // console.log('showWelcome', showWelcome);

    let showFeedback = false;

    if ((eventCode === 'none') || (!eventCode)) {
      if (user_updateNo !== undefined) {
        if (user_openNo === 3 || 15) {
          // if openNo is 3rd or 15th time, show feedback modal
          showFeedback = true;
        } else {
          showFeedback = false;
        }
      } else {
        showFeedback = false;
      }
    } else {
      showFeedback = false;
    }
    console.log('showFeedback', showFeedback);

    Answers.logCustom('Feed.js render'); // eslint-disable-line max-len

    return (
      <View style={{ flex: 1, borderColor: 'purple', borderWidth: 3 }}>

        <WhatsNew visible={showWhatsNew} type="whats_new" user_updateNo={user_updateNo} app_updateNo={app_updateNo} />
        <WhatsNew visible={showWelcome} type="welcome" user_updateNo={user_updateNo} app_updateNo={app_updateNo} />


        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            width: scaledWidth,
            backgroundColor: colours.white,
            borderColor: 'orange',
            borderWidth: 3,
            borderBottomWidth: 1,
            borderBottomColor: colours.lightgray }}
        >
          {
            isReceivingFeed && <Spinner />
          }


          {
            allEvents.length === 0 && !isReceivingFeed &&
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.msg3, { marginTop: 80, marginHorizontal: 15 }]}>
                  You have no events.
                </Text>
                <Text style={[styles.msg3, { marginTop: 30, marginHorizontal: 15 }]}>
                  (Why not create one?)
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    marginBottom: 10,
                    paddingLeft: 5,
                    paddingRight: 5 }}
                >
                  <TouchableHighlight
                    onPress={ () => createNewEvent() }
                    style={[styles.addButtonStyle, { backgroundColor: colours.orange }]}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: '200',
                        height: 50,
                        fontSize: 36,
                        color: colours.white,
                        backgroundColor: colours.transparent }}
                    >
                      +
                    </Text>
                  </TouchableHighlight>

                </View>
                <View style={{ height: 80 }} />
              </View>
          }
          {
            feed.length === 0 && selectedFilter === 'hosting' &&
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.msg3, { marginTop: 80, marginHorizontal: 15 }]}>
                  You are not hosting any events.
                </Text>
                <Text style={[styles.msg3, { marginTop: 40, marginHorizontal: 15 }]}>
                  (Why not create some?)
                </Text>
              </View>
          }
          {
            feed.length === 0 && selectedFilter === 'received' &&
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.msg3, { marginTop: 80, marginHorizontal: 15 }]}>
                  You have not been invited to any events.
                </Text>
                <Text style={[styles.msg3, { marginTop: 40, marginHorizontal: 15 }]}>
                  Tap { '"Code"' } below to enter to join an event using an invite code.
                </Text>
              </View>
          }

          {
            !isReceivingFeed && this.dataSource &&
            <View style={{ borderColor: 'blue', borderWidth: 2 }}>

              <Animated.View
                style={[{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: NAVBAR_HEIGHT,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  borderWidth: 2,
                  borderColor: 'yellow',
                  opacity: navbarOpacity
                },
                { transform: [{ translateY: navbarTranslate }] }]}
              >

                {
                  !isReceivingFeed && allEvents.length > 0 &&
                  <FilterPanel
                    displayAll={ displayAll }
                    displaySome={ displaySome }
                    filterActive={ filterActive }
                    selectedFilter={ selectedFilter }
                  />
                }

              </Animated.View>

              <AnimatedFlatList
                data={this.dataSource}
                renderItem={this.renderItem}
                keyExtractor={item => `${item.id}${Math.random().toString()}`}
                scrollEventThrottle={1}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
                  { useNativeDriver: true },
                )}
                onMomentumScrollBegin={this._onMomentumScrollBegin}
                onMomentumScrollEnd={this._onMomentumScrollEnd}
                onScrollEndDrag={this._onScrollEndDrag}
                contentContainerStyle={{ paddingTop: NAVBAR_HEIGHT }}
              />
            </View>

          }


        </View>
      </View>

    );
  }
}

export default connectAlert(Feed);
