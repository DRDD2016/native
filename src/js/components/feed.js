import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList, Image, Platform, Dimensions } from 'react-native';
import Fabric from 'react-native-fabric';
import _ from 'lodash';
import { Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeedItem from './feed-item';
import FilterPanel from './general/filter-panel';
import Spinner from './common/Spinner';
import ImageHeader from './common/ImageHeader';
import FeedHeader from './common/FeedHeader';
import styles from '../../styles';
import colours from '../../styles/colours';
import { connectAlert } from './Alert';
import ButtonHeader from './common/ButtonHeader';
import BurgerIcon from './common/burger-icon';
import { store } from '../init-store';
import { getFeedFailure } from '../actions/feed';
import WhatsNew, { app_updateNo } from './onboarding/whatsnew';

const { Answers } = Fabric;

const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.8 : Header.HEIGHT * 2;
const logo = require('../../img/sparkLoginLogo.png');

// import { subscribeToBranchLinks } from '../lib/branchLink';

class Feed extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />,
    headerLeft: <ButtonHeader />,
    headerRight: <ButtonHeader
      onPress={() => navigation.navigate('DrawerOpen')}
    >
      <BurgerIcon />
    </ButtonHeader>,
    tabBarIcon: ({ tintColor }) =>
      <Icon name="globe" size={32} color={tintColor} />,
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  });

  constructor (props) {
    super(props);

    this.state = {
      isModalVisible: false
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


  createDataSource (feed) {
    this.dataSource = feed;
  }

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

    const {
      allEvents,
      feed,
      isReceivingFeed,
      displaySome,
      displayAll,
      filterActive,
      selectedFilter,
      isConnected,
      createNewEvent,
      user_updateNo,
      user_openNo,
      eventCode } = this.props;

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
      <View style={{ flex: 1, borderColor: 'green', borderWidth: 1 }}>

        <WhatsNew visible={showWhatsNew} type={'whats_new'} user_updateNo={user_updateNo} app_updateNo={app_updateNo} />
        <WhatsNew visible={showWelcome} type={'welcome'} user_updateNo={user_updateNo} app_updateNo={app_updateNo} />

        <FeedHeader>
          { !isConnected && this.renderAlert() }
          {
            !isReceivingFeed && allEvents.length > 0 &&
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
            borderColor: 'orange',
            borderWidth: 1,
            borderBottomWidth: 1,
            borderBottomColor: colours.lightgray }}
        >
          {
            isReceivingFeed && <Spinner />
          }


          <View style={{ borderColor: 'green', borderWidth: 1 }}>
            { !isConnected && this.renderAlert() }

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
              <FlatList
                data={this.dataSource}
                renderItem={this.renderItem}
                keyExtractor={item => `${item.id}${Math.random().toString()}`}
              />
            }

          </View>

        </View>
      </View>

    );
  }
}

export default connectAlert(Feed);
