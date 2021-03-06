import React, { Component } from 'react';
import { StatusBar, InteractionManager, Animated, View, FlatList, Image, Platform, Dimensions } from 'react-native';
import Fabric from 'react-native-fabric';
import _ from 'lodash';
import { Header } from 'react-navigation';
import FeedItem from './feed-item';
import FilterPanel from './general/filter-panel';
import Spinner from './common/Spinner';
// import ImageHeader from './common/ImageHeader';
import { ConfirmButton } from '../../styles';
import { GeneralText, MessageText, ConfirmButtonText } from '../../styles/text';
import { } from '../../styles/scaling';
import colours from '../../styles/colours';
// import { connectAlert } from './Alert';
import DropdownView from './common/DropdownView';
import ButtonHeader from './common/ButtonHeader';
import BurgerIcon from './common/burger-icon';
import OfflineIconContainer from '../containers/common/OfflineIconContainer';
import { store } from '../init-store';
import { getFeedFailure } from '../actions/feed';
import WhatsNew from './onboarding/whatsnew';
// import { verticalScale } from '../../styles/scaling';

const { Answers } = Fabric;

const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.6 : Header.HEIGHT * 0.6;
const logo = require('../../img/sparkLoginLogo.png');

const NAVBAR_HEIGHT = Header.HEIGHT;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 5, android: StatusBar.currentHeight }); // ios height was 20
const FILTER_PANEL_HEIGHT = Platform.select({ ios: (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) - 15, android: NAVBAR_HEIGHT });
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// import { subscribeToBranchLinks } from '../lib/branchLink';

class Feed extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' }, // workaround to remove padding at top of header
    headerLeft: <View style={{ paddingLeft: 3, alignItems: 'center', flex: 1 }}>
      <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />
    </View>,
    headerRight: <View style={{ flexDirection: 'row' }}>

      <OfflineIconContainer />

      <ButtonHeader
        onPress={() => navigation.openDrawer()}
      >
        <BurgerIcon />
      </ButtonHeader>
    </View>,
    headerStyle: {

      paddingBottom: 0,
      backgroundColor: colours.headerBackgroundColor
      // elevation: 1,
      // shadowOpacity: 0.8,
      // shadowRadius: 1,
      // shadowColor: 'gray',
      // shadowOffset: { height: 1, width: 0 }
    },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor
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
        FILTER_PANEL_HEIGHT,
      )
    };
  }

  componentWillMount () {

    const { handleSubmitCode, eventCode, haveFeedRequest, onAppLoad, user_openNo } = this.props;


    onAppLoad(user_openNo);

    haveFeedRequest();
    console.log('FeedWillMount: ');
    // console.log('FeedWillMountprops: ', this.props);
    // const timestamp = new Date();
    // console.log('Feed WillMount:', timestamp.getTime());


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

    console.log('feed DidMount');


    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      // 2: Component is done animating
      // 3: Start fetching the team / or render the view
      // this.props.dispatchTeamFetchStart();

      console.log('feed Did Mount - interactions finished - expensive code starts');

      // expensive code starting

      Answers.logCustom('Feed.js Mounted', { additionalData: 'nothing' });

      this.state.scrollAnim.addListener(({ value }) => {
        // This is the same calculations that diffClamp does.
        const diff = value - this._scrollValue;
        this._scrollValue = value;
        this._clampedScrollValue = Math.min(
          Math.max(this._clampedScrollValue + diff, 0),
          FILTER_PANEL_HEIGHT,
        );
      });
      this.state.offsetAnim.addListener(({ value }) => {
        this._offsetValue = value;
      });

      // expensive code finished

      console.log('feed Did Mount - expensive code finished');

      this.setState({
        isReady: true
      });

    });


  }

  componentWillReceiveProps (nextProps) {

    const { handleSubmitCode } = this.props;
    const { eventCode } = nextProps;

    console.log('feed WillReceiveProps:');
    // console.log('feed WillReceiveProps:', nextProps);

    this.setState({
       isReady: false
    });


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


    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      // 2: Component is done animating
      // 3: Start fetching the team / or render the view
      // this.props.dispatchTeamFetchStart();

      console.log('feed WillReceiveProps - interactions finished - expensive code starts');

      // expensive code starting after interactions finished

      console.log('Feed Receives NextProps after interactions');
      // console.log('thisProps', this.props);
      // console.log('NextProps', nextProps);


      const { feed } = nextProps;
      const newData = [].concat(feed).reverse();
      // console.log('newData', newData);

      const uniqueFeedData = _.uniqBy(newData, 'feed_item.feed_tag');
        // const itemTag = `Tag_${item.event_id}_${item.subject_user_id}`;
        // console.log('itemTag:', itemTag);
        // console.log('index:', index);
        // console.log('self:', self);

      this.createDataSource(uniqueFeedData);

      // expensive code finished

      console.log('feed WillReceiveProps - expensive code finished');


      this.setState({
         isReady: true
      });
    });

  }

  componentWillUpdate (nextProps, nextState) {
    console.log('feed willUpdate: ');
    if (this.props !== nextProps) {
        console.log('feed props changed: ');
    }
    // console.log('feed thisProps: ', this.props);
    // console.log('feed nextProps: ', nextProps);
    if (this.state !== nextState) {
        console.log('feed state changed: ');
    }
    // console.log('feed thisState: ', this.state);
    // console.log('feed nextState: ', nextState);
  }

  componentDidUpdate () {
    const { isFetchingFeed, allEvents, haveFeedSuccess, haveFeedFailure } = this.props;
    console.log('feed didUpdate isFetchingFeed: ', isFetchingFeed);
    // console.log('allEvents: ', allEvents);
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
      this._clampedScrollValue > (FILTER_PANEL_HEIGHT) / 2
      ? this._offsetValue + NAVBAR_HEIGHT
      : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true
    }).start();
  };


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

    console.log('renderFeed');

    console.log('screenPropsFeed', this.props.screenProps);

    if (!this.state.isReady) {
      console.log('renderFeedActivityIndicator');
      return (
        <View style={{ backgroundColor: colours.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}><Spinner /></View>
      );
    }

    console.log('renderFeedContent');

    // const timestamp = new Date();
    // console.log('Feed render:', timestamp.getTime());

    // console.log('Feed render props:', this.props);

    const { width } = Dimensions.get('window'); // inline style to force render on screen rotation
    const scaledWidth = width > 700 ? (width * 1) : (width * 1);

    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, FILTER_PANEL_HEIGHT],
      outputRange: [0, -(FILTER_PANEL_HEIGHT)],
      extrapolate: 'clamp'
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, FILTER_PANEL_HEIGHT],
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
      app_updateNo,
      user_updateNo,
      user_openNo,
      eventCode
      // isConnected
    } = this.props;

    // let showWhatsNew = false;
    //
    // if ((eventCode === 'none') || (!eventCode)) {
    //   if (user_updateNo !== undefined) {
    //     if (user_updateNo < app_updateNo) {
    //       // if an old updateNo, then show whatsnew
    //       showWhatsNew = true;
    //     } else {
    //       showWhatsNew = false;
    //     }
    //   } else {
    //     showWhatsNew = false;
    //   }
    // } else {
    //   showWhatsNew = false;
    // }
    //
    // let showWelcome = false;
    //
    // if ((eventCode === 'none') || (!eventCode)) {
    //   if (user_updateNo === undefined) {
    //     // if no updateNo, then its a new user, so show welcome (in whatsnew for now)
    //     showWelcome = true;
    //   } else {
    //     showWelcome = false;
    //   }
    // } else {
    //   showWelcome = false;
    // }
    // console.log('showWelcome', showWelcome);

    // let showFeedback = false;
    //
    // if ((eventCode === 'none') || (!eventCode)) {
    //   if (user_updateNo !== undefined) {
    //     if (user_openNo === 3 || 15) {
    //       // if openNo is 3rd or 15th time, show feedback modal
    //       showFeedback = true;
    //     } else {
    //       showFeedback = false;
    //     }
    //   } else {
    //     showFeedback = false;
    //   }
    // } else {
    //   showFeedback = false;
    // }
    // console.log('showFeedback', showFeedback);

    Answers.logCustom('Feed.js render'); // eslint-disable-line max-len
    console.log('feed app_updateNo', app_updateNo);
    console.log('feed user_updateNo', user_updateNo);
    console.log('feed user_openNo', user_openNo);
    console.log('feed eventCode', eventCode);

    return (
      <View testID="feed" style={{ flex: 1, backgroundColor: colours.white }}>


        <WhatsNew type="whats_new" user_updateNo={user_updateNo} app_updateNo={app_updateNo} />


        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            width: scaledWidth,
            backgroundColor: colours.white,
            borderBottomWidth: 1,
            borderBottomColor: colours.lightgray }}
        >

          {
            isReceivingFeed && <Spinner />
          }


          {
            allEvents.length === 0 && !isReceivingFeed &&
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <GeneralText>
                  You have no events.
                </GeneralText>
                <MessageText style={{ marginTop: 20, marginHorizontal: 15 }}>
                  Why not create one?
                </MessageText>
                <ConfirmButton
                  onPress={ () => createNewEvent() }
                  style={{ marginTop: 20, backgroundColor: colours.orange, borderColor: colours.orange }}
                >
                  <ConfirmButtonText>
                    Get Started
                  </ConfirmButtonText>
                </ConfirmButton>


              </View>
          }
          {
            feed.length === 0 && selectedFilter === 'hosting' &&
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <GeneralText>
                  You are not hosting any events.
                </GeneralText>
                <MessageText style={{ marginTop: 20, marginHorizontal: 15 }}>
                  Why not create some?
                </MessageText>
                <ConfirmButton
                  onPress={ () => createNewEvent() }
                  style={{ marginTop: 20, backgroundColor: colours.orange, borderColor: colours.orange }}
                >
                  <ConfirmButtonText>
                    Get Started
                  </ConfirmButtonText>
                </ConfirmButton>

              </View>
          }
          {
            feed.length === 0 && selectedFilter === 'received' &&
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <GeneralText>
                  You have not been invited to any events.
                </GeneralText>
                <MessageText style={{ marginTop: 20, marginHorizontal: 15 }}>
                  Tap { '"RSVP"' } below to enter to join an event using an invite code.
                </MessageText>
              </View>
          }

          {
            !isReceivingFeed && this.dataSource && feed.length > 0 &&
            <View style={{
              backgroundColor: colours.filterPanelBackgroundColor,
              flex: 1 // added

            }}>

              <DropdownView
                navbarHeight={FILTER_PANEL_HEIGHT}
                navbarOpacity={navbarOpacity}
                navbarTranslate={navbarTranslate}
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

              </DropdownView>

              <AnimatedFlatList
                initialNumToRender={10}
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
                contentContainerStyle={{ backgroundColor: colours.white, paddingTop: FILTER_PANEL_HEIGHT }}
              />
            </View>

          }


        </View>
      </View>

    );
  }
}

// export default connectAlert(Feed);
export default Feed;
