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
import styles, { scaledWidth } from '../../styles';
import colours from '../../styles/colours';
import { connectAlert } from './Alert';
import ButtonHeader from './common/ButtonHeader';
import BurgerIcon from './common/burger-icon';
import SpinnerModal from './common/SpinnerModal';
import { store } from '../init-store';
import { getFeedFailure } from '../actions/feed';

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

    const { handleSubmitCode, eventCode, haveFeedRequest } = this.props;

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

    if (this.props.eventCodeError) {
      this.setState({ isModalVisible: true });
    }

    if (!nextProps.eventCodeError) {
      this.setState({ isModalVisible: false });
    }

    const { feed } = nextProps;
    const newData = [].concat(feed).reverse();
    console.log('newData', newData);

    const uniqueFeedData = _.uniqBy(newData, 'feed_item.feed_tag');
      // const itemTag = `Tag_${item.event_id}_${item.subject_user_id}`;
      // console.log('itemTag:', itemTag);
      // console.log('index:', index);
      // console.log('self:', self);

    console.log('uniqueFeedData', uniqueFeedData);

    this.createDataSource(uniqueFeedData);


  }

  componentDidUpdate () {
    const { isFetchingFeed, allEvents, haveFeedSuccess, haveFeedFailure } = this.props;
    console.log('isFetchingFeed: ', isFetchingFeed);
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
    console.log('feed_item', feed_item);

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

    const screenWidth = Dimensions.width;
    console.log('screenWidth', screenWidth);
    const {
      allEvents,
      feed,
      isReceivingFeed,
      isFetchingFeed,
      displaySome,
      displayAll,
      filterActive,
      selectedFilter,
      isConnected,
      eventCodeError,
      isFetchingBranch,
      createNewEvent,
      saveEventStatus,
      isFetchingEvent } = this.props;

    const isLoading = isFetchingBranch || isReceivingFeed || isFetchingFeed || isFetchingEvent;

    console.log('isFetchingBranch: ', isFetchingBranch);
    console.log('isReceivingFeed: ', isReceivingFeed);
    console.log('isFetchingFeed: ', isFetchingFeed);
    console.log('isFetchingEvent: ', isFetchingEvent);
    console.log('isLoading: ', isLoading);
    console.log('feed isConnected: ', isConnected);
    console.log('saveEventStatus: ', saveEventStatus);
    Answers.logCustom('Feed.js render', { additionalData: [{ isFetchingBranch }, { isReceivingFeed }, { isFetchingFeed }, { isFetchingEvent }, { isLoading }, { isConnected }, { saveEventStatus }] }); // eslint-disable-line max-len
    if (saveEventStatus === 'Started') {
      // return this if waiting for Branch, etc
      console.log('saveEventStatus: ', 'Started');
      console.log('visible saveEventStatus Started', isLoading);

      return (
        <View style={{ flex: 1 }}>
          <SpinnerModal
            visible={isLoading}
            type={ 'share_invite' }
            isConnected={isConnected}
            onClose={ () => { this.setState({ isModalVisible: false }); }}
            additionalInfo={ `feed share_invite --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
          />
        </View>
      );
    }

    if (isLoading) {
      // return this if waiting for Branch, etc
      console.log('visible isLoading', isLoading);

      return (
        <View style={{ flex: 1 }}>
          <SpinnerModal
            visible={isLoading}
            type={ 'loading' }
            isConnected={isConnected}
            onClose={ () => { this.setState({ isModalVisible: false }); }}
            additionalInfo={ `feed isLoading --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
          />
        </View>
      );
    }

    if (this.state.isModalVisible) {
      console.log('isModalVisible Spinner: ', this.state.isModalVisible);
      // return this if error for Branch, etc
      return (
        <View style={{ flex: 1 }}>
          {
            eventCodeError &&
            <SpinnerModal
              visible={this.state.isModalVisible}
              type={ 'event_code_error' }
              isConnected={isConnected}
              onClose={ () => { this.setState({ isModalVisible: false }); }}
              eventCodeError={eventCodeError}
              additionalInfo={ `feed eventCodeError --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
            />

          }
        </View>
      );
    }


    return (
      <View style={{ flex: 1 }}>


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
            borderBottomWidth: 1,
            borderBottomColor: colours.lightgray }}
        >
          {
            isReceivingFeed && <Spinner />
          }


          <View>
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
                keyExtractor={item => `${item.id}${Math.random()}`}
              />
            }

          </View>

        </View>
      </View>

    );
  }
}

export default connectAlert(Feed);
