import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeedItem from './feed-item';
import FilterPanel from './general/filter-panel';
import Spinner from './common/Spinner';
import ImageHeader from './common/ImageHeader';
import FeedHeader from './common/FeedHeader';
import styles from '../../styles';
import colours from '../../styles/colours';
import { connectAlert } from './Alert';

class Feed extends Component {

  static navigationOptions = {
    title: 'Feed',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="globe" size={32} color={tintColor} />,
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  }

  constructor (props) {
    super(props);

    this.state = {
      isModalVisible: false,
      refreshing: false
    };

  }

  componentWillMount () {


    // if (this.props.user.push_info) {
    //   this.props.handleSavePush(this.props.push_info);
    // }

    // initSocket();

    // console.log('feed mountProps beforeTimeOut', this.props);

    setTimeout(() => {

      // code here will execute after time limit?

      if (this.props.eventCode === 'none') {
        // console.log('no Code');
        if (this.props.networkIsFetching) {
          // console.log('stopFetching Link');
          this.props.stopFetchingLink();
        }

      } else {
        // Code so just wait until SubmitCode action completes, will go to Event.
        // console.log('Code so waiting for Submit Code to finish');
      }

    }, 3000);


    // if (this.props.eventCodeError || this.props.eventIsFetching) {
    //   this.setState({ isModalVisible: true });
    // }
    //
    // if (this.props.eventCode) {
    //   if (this.props.eventCode !== 'none') {
    //     // stopSocket();
    //     const code = this.props.eventCode;
    //
    //     console.log('submittingCode feed compWillMount');
    //
    //     this.props.handleSubmitCode(code);
    //   }
    // }

  }

  componentWillReceiveProps (nextProps) {

    // console.log('compWillRecProps feed thisprops', this.props);
    // console.log('compWillRecProps feed nextProps', nextProps);


    if (this.props.eventCodeError || this.props.eventIsFetching || this.props.networkIsFetching) {
      this.setState({ isModalVisible: true });
    }

    if (!nextProps.eventCodeError && !nextProps.eventIsFetching && !nextProps.networkIsFetching) {
      this.setState({ isModalVisible: false });
    }

    // if (nextProps.eventCode && !nextProps.eventIsFetching) {
    //   if (nextProps.eventCode !== 'none') {
    //     // stopSocket();
    //     const code = nextProps.eventCode;
    //
    //     console.log('submittingCode feed compWillRecProps');
    //
    //     this.props.handleSubmitCode(code);
    //   }
    // }

    const { feed } = nextProps;
    const newData = [].concat(feed).reverse();
    this.createDataSource(newData);

  }

  createDataSource (feed) {
    this.dataSource = feed;
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.updateFeed();
    });
  }

  updateFeed = () => {

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

    return (
      <FeedItem
        user_id={ user_id }
        key={ Math.random() }
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
        handleSelection={ handleSelection }
        feed_item_id={ id }
      />
    );
  }

  render () {

    const {
      allEvents,
      feed,
      isFetching,
      eventIsFetching,
      networkIsFetching,
      displaySome,
      displayAll,
      filterActive,
      selectedFilter,
      isConnected,
      eventCodeError } = this.props;

    const anyIsFetching = eventIsFetching || networkIsFetching;
    // console.log('Feed this.state.isModalVisible: ', this.state.isModalVisible);
    // console.log('isFetching: ', isFetching);
    // console.log('eventIsFetching: ', eventIsFetching);
    // console.log('networkIsFetching: ', networkIsFetching);
    return (
      <View style={{ flex: 1 }}>
        <Modal transparent animationType={'slide'} visible={this.state.isModalVisible} onRequestClose={() => { alert('Modal has been closed.'); }}>
          {
            <View style={styles.modalWrapper}>

              {
                anyIsFetching &&
                <View style={styles.modalConfirm}>

                  <Text style={[styles.msg1, { flex: 1 }]}>Loading</Text>
                  <Text style={[styles.msg2, { flex: 1 }]}>please wait...</Text>
                  <Spinner size="large" />
                  <View style={{ flex: 1 }} />

                </View>
              }

              {
                eventCodeError &&
                <View style={styles.modalConfirm}>
                  <Text style={[styles.msg1, { flex: 1 }]}>Error fetching invite</Text>
                  <Text style={[styles.msg2, { flex: 1 }]}>please check your internet connection</Text>
                  <View style={{ flex: 1 }} />

                  <View style={{ flex: 1 }}>
                    <TouchableHighlight
                      style={ [styles.confirmButton, { marginBottom: 20, marginTop: 20 }] }
                      onPress={ () => {
                        this.setState({
                          isModalVisible: false
                        });

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
                  <Text style={[styles.msg3, { marginTop: 40, marginHorizontal: 15 }]}>
                    (Why not create some?)
                  </Text>
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
                extraData={this.state}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            }

          </View>

        </View>
      </View>

    );
  }
}

export default connectAlert(Feed);
