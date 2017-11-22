import React, { Component } from 'react';
import { View, Text, ScrollView, ListView, Modal, TouchableHighlight } from 'react-native';
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
      isModalVisible: false
    };

  }

  componentWillMount () {


    // if (this.props.user.push_info) {
    //   this.props.handleSavePush(this.props.push_info);
    // }

    // initSocket();

    console.log('feed mountProps', this.props);

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

    console.log('feed nextProps', nextProps);
    console.log('feed thisprops', this.props);

    if (this.props.eventCodeError || this.props.eventIsFetching) {
      this.setState({ isModalVisible: true });
    }

    if (!this.props.eventCodeError && !this.props.eventIsFetching) {
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
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(feed);
  }

  renderAlert = () => {
    setTimeout(() => {
      this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
    }, 2000);
  }

  renderRow = (rowData, rowID) => {
    const { feed_item, id } = rowData;
    const { user_id, handleSelection } = this.props;

    return (
      <FeedItem
        user_id={ user_id }
        key={ Math.random() }
        index={ rowID }
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
      displaySome,
      displayAll,
      filterActive,
      selectedFilter,
      isConnected,
      eventCodeError } = this.props;
    console.log('isFetching: ', isFetching);
    console.log('eventIsFetching: ', eventIsFetching);
    return (
      <View style={{ flex: 1 }}>
        <Modal transparent animationType={'slide'} visible={this.state.isModalVisible} onRequestClose={() => { alert('Modal has been closed.'); }}>
          {
            <View style={styles.modalWrapper}>

              {
                eventIsFetching &&
                <View style={styles.modalConfirm}>

                  <Text style={[styles.msg1, { flex: 1 }]}>Fetching invite</Text>
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

          <ScrollView>
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
                <ListView
                  enableEmptySections
                  dataSource={this.dataSource}
                  renderRow={this.renderRow}
                  removeClippedSubviews={false}
                />
              }

            </View>

          </ScrollView>

        </View>
      </View>

    );
  }
}

export default connectAlert(Feed);
