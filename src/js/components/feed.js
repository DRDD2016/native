import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight, FlatList, Image, Platform } from 'react-native';
import Fabric from 'react-native-fabric';
import { Header } from 'react-navigation';
// import { OptimizedFlatList } from 'react-native-optimized-flatlist';
// import { slowlog } from 'react-native-slowlog';
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

    // slowlog(this, /.*/);

    this.state = {
      isModalVisible: false
    };

  }

  componentWillMount () {

    console.log('FeedWillMountprops: ', this.props);

    const { handleSubmitCode, eventCode } = this.props;

    console.log('eventCode FeedMount:', eventCode);
    if (eventCode) {
      if (eventCode !== 'none') {
        console.log('submittingEventCode from Feed');
        handleSubmitCode(eventCode);
      }
    }

    console.log('Mount this.props.eventCodeError: ', this.props.eventCodeError);

    if (this.props.eventCodeError) {
      console.log('dispatching getFeedFailure: ');
      store.dispatch(getFeedFailure(this.props.eventCodeError));
      // this.setState({ isModalVisible: true });

    }


    // subscribeToBranchLinks(this.props.navigation);


    // if (this.props.user.push_info) {
    //   this.props.handleSavePush(this.props.push_info);
    // }

    // initSocket();

    // setTimeout(() => {

      // code here will execute after time limit?

    // }, 3000);

  }

  componentDidMount () {
    Answers.logCustom('Feed.js Mounted', { additionalData: 'nothing' });
    console.log('FeedDidMount');
  }

  componentWillReceiveProps (nextProps) {

    console.log('Feed Receives NextProps');
    console.log('thisProps', this.props);
    console.log('NextProps', nextProps);

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
    this.createDataSource(newData);

  }

  componentDidUpdate () {
    const { isFetching, allEvents, fetchFeedSuccess, fetchFeedFailure } = this.props;
    console.log('isFetching: ', isFetching);
    console.log('allEvents: ', allEvents);
    if (isFetching) {
      if (allEvents.length > 0) {
        fetchFeedSuccess();
      } else {
        fetchFeedFailure();
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

    console.log('renderItem', `${index} ${feed_item.name}`);

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
      />
    );
  }

  render () {

    console.log('renderFeed');

    const {
      allEvents,
      feed,
      isFetching,
      displaySome,
      displayAll,
      filterActive,
      selectedFilter,
      isConnected,
      eventCodeError,
      isFetchingBranch,
      createNewEvent,
      saveEventStatus } = this.props;

    const isLoading = isFetchingBranch || isFetching;

    console.log('isFetchingBranch: ', isFetchingBranch);
    console.log('isFetching: ', isFetching);
    console.log('isLoading: ', isLoading);
    console.log('isConnected: ', isConnected);
    console.log('saveEventStatus: ', saveEventStatus);

    if (saveEventStatus === 'Started') {
      // return this if waiting for Branch, etc
      console.log('saveEventStatus: ', 'Started');

      return (
        <View style={{ flex: 1 }}>
          <Modal
            transparent animationType={'slide'} visible={isLoading}
            onRequestClose={() => {
              this.setState({
                isModalVisible: false
              });
            }}
          >
            {
              <View style={styles.modalWrapper}>

                {
                  <View style={styles.modalConfirm}>

                    <Text style={[styles.msg1, { flex: 1 }]}>Sharing invite</Text>
                    <Text style={[styles.msg2, { flex: 1 }]}>please wait...</Text>
                    <View style={{ flex: 1 }}>
                      <Spinner size="large" />
                    </View>
                    <View style={{ flex: 1 }} />

                  </View>
                }

              </View>
            }

          </Modal>
        </View>
      );
    }

    if (isLoading) {
      // return this if waiting for Branch, etc

      console.log('isLoading Spinner: ', isLoading);

      return (
        <View style={{ flex: 1 }}>
          <Modal
            transparent animationType={'slide'} visible={isLoading}
            onRequestClose={() => {
              this.setState({
                isModalVisible: false
              });
            }}
          >
            {
              <View style={styles.modalWrapper}>

                {
                  <View style={styles.modalConfirm}>

                    <Text style={[styles.msg1, { flex: 1 }]}>Loading</Text>
                    <Text style={[styles.msg2, { flex: 1 }]}>please wait...</Text>
                    <View style={{ flex: 1 }}>
                      <Spinner size="large" />
                    </View>
                    {!isConnected && <Text style={[styles.msg2, { flex: 1 }]}>poor internet connection</Text>}
                    {
                      // isFetchingBranch && <Text style={[styles.msg2, { flex: 1 }]}>{`isFetchingBranch: ${isFetchingBranch}`}</Text>
                    }
                    {
                      // isFetching && <Text style={[styles.msg2, { flex: 1 }]}>{`isFetching: ${isFetching}`}</Text>
                    }

                    <View style={{ flex: 1 }} />

                  </View>
                }

              </View>
            }

          </Modal>
        </View>
      );
    }

    if (this.state.isModalVisible) {
      console.log('isModalVisible Spinner: ', this.state.isModalVisible);
      // return this if error for Branch, etc
      return (
        <View style={{ flex: 1 }}>
          <Modal transparent animationType={'slide'} visible={this.state.isModalVisible} onRequestClose={() => { alert('Modal has been closed.'); }}>
            {
              <View style={styles.modalWrapper}>

                {
                  eventCodeError &&
                  <View style={styles.modalConfirm}>
                    <Text style={[styles.msg1, { flex: 1 }]}>Poor connectivity</Text>
                    <Text style={[styles.msg2, { flex: 1 }]}>please check your internet connection</Text>
                    <Text style={[styles.msg2, { flex: 1 }]}>{`eventCodeError: ${eventCodeError}`}</Text>
                    <View style={{ flex: 1 }} />

                    <View style={{ flex: 1 }}>
                      <TouchableHighlight
                        style={ [styles.confirmButton, { marginBottom: 20, marginTop: 20 }] }
                        onPress={ () => {
                          this.setState({
                            isModalVisible: false
                          });

                          this.props.saveIncomingLinkError(undefined);
                          // and dispatch action to remove event code error?

                        }}
                      >
                        <Text style={styles.confirmButtonText}>OK</Text>
                      </TouchableHighlight>
                    </View>

                  </View>
                }
              </View>
            }

          </Modal>

        </View>
      );
    }


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


          <View>
            { !isConnected && this.renderAlert() }

            {
              allEvents.length === 0 && !isFetching &&
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
              !isFetching && this.dataSource &&
              <FlatList
                data={this.dataSource}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
              />
            }

          </View>

        </View>
      </View>

    );
  }
}

export default connectAlert(Feed);
