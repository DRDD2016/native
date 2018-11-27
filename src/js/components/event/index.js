import React, { Component } from 'react';
import { View, Text, Platform, TouchableHighlight, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-navigation';
import InviteePoll from './invitee-poll';
import HostPoll from './host-poll';
import FinalisedEvent from './finalised-event';
import styles from '../../../styles';
import colours from '../../../styles/colours';
// import Header from '../common/Header';
import CloseButton from '../common/CloseButton';
import Button from '../common/Button';
import DeleteIcon from '../common/delete-icon';
import BannerBar from '../common/BannerBar';
// import HeaderBack from '../common/CreateHeaderBackground';

export default class Event extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' }, // workaround to remove padding at top of header
    title: (navigation.state.params.eventTitle === undefined) ? 'Sorry...' : navigation.state.params.eventTitle,
    headerStyle: { backgroundColor: colours.headerBackgroundColor, elevation: 0 },
    headerRight: (
      navigation.state.params.userIsHost &&
        <Button
          buttonStyle={{ width: Header.HEIGHT, paddingLeft: 20, paddingRight: 20, flexDirection: 'row', alignSelf: 'center' }}
          textStyle={{ color: colours.gray }}
          onPress={ () => navigation.state.params.handleDelete(navigation.state.params.event, navigation.state.params.event.event_id) }
        >
          <DeleteIcon />
        </Button>
    ),
    headerLeft: <CloseButton stack="Event" nav={navigation} />,
    headerTintColor: colours.headerButtonColor
  });

  constructor (props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
  }

  componentWillMount () {

    // console.log('stopFetching Link');
    this.props.stopFetchingLink();

    const eventTitle = (this.props.userIsHost && this.props.isPoll) ? 'Your poll' : 'other';
    console.log('eventTitle: ', eventTitle);

    const { setParams } = this.props.navigation;
    setParams({ eventTitle });

  }

  componentDidMount () {
    this.props.navigation.setParams({
      handleDelete: this.handleDelete.bind(this)
    });
  }

  componentWillReceiveProps (nextProps) {

    console.log('Event Thisprops: ', this.props);
    console.log('Event Nextprops: ', nextProps);


    // created on: XX/XX/XXXX
    // deadline to vote: XX/XX/XXXX


    if (this.props.event.host_user_id) {

      if (this.props.event.host_user_id !== nextProps.event.host_user_id) {
        console.log('hostids not equal');
        console.log('this.props.event.host_user_id', this.props.event.host_user_id);
        this.props.getUserById(this.props.event.host_user_id);
      }
      if (this.props.event.firstname === undefined) {
        console.log('this.props.event.host_user_id', this.props.event.host_user_id);
        this.props.getUserById(this.props.event.host_user_id);
      }
    }


  }

  componentWillUpdate (nextProps) {

    console.log('Event index will update thisProps: ', this.props);

    if (nextProps.event.name !== this.props.event.name) {
      this.props.navigation.setParams({
        name: nextProps.event.name,
        handleDelete: this.props.handleDeleteEvent
      });

    }

    console.log('Event index will update nextProps: ', nextProps);
    console.log('ThisPropsNavigation: ', this.props.navigation);

  }

  handleDelete (event, event_id) {
    this.setState({
      isModalVisible: true
    });
    console.log(event_id);
    // this.props.handleDeleteEvent(event, event_id);
  }

  eventRouter () {

    if (this.props.cancelled) {
      return (
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.msg2}>This event has been cancelled!</Text>
        </View>
      );
    } else if (this.props.error === 'Event has been deleted') {
      return (
        <View>
          <Text>This event has been cancelled!</Text>
        </View>
      );
    } else if (this.props.error) {
      return (
        <View>
          <Text>An error has occurred!</Text>
          <Text>{`ERROR: ${this.props.error}`}</Text>
        </View>
      );
    } else if (this.props.userIsHost && this.props.isPoll) {
      return (
        <HostPoll
          navigator={this.props.navigation}
          vote_count={ this.props.vote_count }
          event={ this.props.event }
          finalChoices={ this.props.finalChoices }
          handleConfirmEvent={ this.props.handleConfirmEvent }
          voteCount={ this.props.voteCount }
          handleInviteMoreFriends={ this.props.handleInviteMoreFriends }
          confirmedEvent={ this.props.confirmedEvent }
        />
      );
    } else if (!this.props.userIsHost && this.props.isPoll) {
      return (
        <InviteePoll
          navigator={this.props.navigation}
          event={ this.props.event }
          voteSaved={this.props.voteSaved}
          handleVote={ this.props.handleVote }
          voteCount={ this.props.voteCount }
        />
      );
    } else { // eslint-disable-line no-else-return
      return (
        <FinalisedEvent
          navigator={this.props.navigation}
          event={ this.props.event }
          event_id={ this.props.event_id }
          userIsHost={ this.props.userIsHost }
          isPoll={this.props.isPoll}
          rsvps={ this.props.rsvps }
          rsvpToEvent={ this.props.rsvpToEvent }
          handleDeleteEvent={ this.props.handleDeleteEvent }
          handleEdit={ this.props.navigation.state.params.handleEdit }
          handleInviteMoreFriends={ this.props.handleInviteMoreFriends }
        />
      );
    }
  }

  render () {

    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: colours.white, flex: 1 }}>

          <BannerBar />

          <Modal transparent animationType="slide" visible={this.state.isModalVisible} onRequestClose={() => { }}>

            <View style={styles.modalWrapper}>

              <View style={styles.modalConfirm}>
                <View style={{ flex: 0.5 }}>
                  <Icon name="warning" size={18} color={colours.orange} />
                </View>
                <Text style={[styles.msg1, { flex: 1 }]}>Please Confirm</Text>
                <Text style={[styles.msg2, { flex: 0.4 }]}>Are you sure you want</Text>
                <Text style={[styles.msg2, { flex: 0.4 }]}>to delete this event?</Text>

                <View style={{ justifyContent: 'space-between', marginTop: 40, flex: 2, flexDirection: 'row' }}>
                  <TouchableHighlight
                    style={ [styles.confirmButton, { flex: 1, marginHorizontal: 5, marginBottom: 20, marginTop: 20 }] }
                    onPress={ () => {
                      this.setState({
                        isModalVisible: false
                      });

                    }}
                  >
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <Icon name="times-circle" size={24} color={colours.red} />
                      <Text style={styles.confirmButtonText}> KEEP</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={ [styles.confirmButton, { flex: 1, marginHorizontal: 5, marginBottom: 20, marginTop: 20 }] }
                    onPress={ () => {
                      this.setState({
                        isModalVisible: false
                      });
                      console.log('this.props.event', this.props.event);
                      console.log('this.props.event_id', this.props.event_id);
                      this.props.handleDeleteEvent(this.props.event, this.props.event.event_id);

                    }}
                  >
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <Icon name="check-circle" size={24} color="green" />
                      <Text style={styles.confirmButtonText}> DELETE</Text>
                    </View>
                  </TouchableHighlight>
                </View>

              </View>

            </View>

          </Modal>

          <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 20 : 110 }}>
            {
              this.props.event && this.eventRouter()
            }
          </View>
        </View>
      </View>
    );
  }
}
