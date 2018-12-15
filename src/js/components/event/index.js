import React, { Component } from 'react';
import { View, Text, Platform, TouchableHighlight, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Header } from 'react-navigation';
import InviteePoll from './invitee-poll';
import HostPoll from './host-poll';
import FinalisedEvent from './finalised-event';
import styles, { ModalWrapper, ConfirmButton, ModalView } from '../../../styles';
import colours from '../../../styles/colours';
// import Header from '../common/Header';
import BackButton from '../common/BackButton';
import ButtonHeader from '../common/ButtonHeader';
import DeleteIcon from '../common/delete-icon';
import { GeneralText, MessageText, ForgotPasswordText, ConfirmButtonText } from '../../../styles/text';
import { iconScale } from '../../../styles/scaling';
import BannerBar from '../common/BannerBar';
// import HeaderBack from '../common/CreateHeaderBackground';

export default class Event extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' }, // workaround to remove padding at top of header
    title: (navigation.state.params.eventTitle === undefined) ? 'Sorry...' : navigation.state.params.eventTitle,
    headerStyle: { backgroundColor: colours.headerBackgroundColor, elevation: 0 },
    headerRight: (
      <ButtonHeader

      />
    ),
    headerLeft: <BackButton stack="Event" nav={navigation} />,
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
    const { userIsHost, isPoll, error, cancelled } = this.props;

    const chooseEventTitle = () => {
      if (userIsHost && isPoll) {
        return (
          'Your poll'
        );
      } else if (userIsHost) {
        return (
          'You are hosting'
        );
      } else if (!userIsHost && isPoll) {
        return (
          'Vote'
        );
      } else if (!userIsHost) {
        return (
          'You are invited to'
        );

      } else if (error === 'Event has been deleted') {
        return (
          'Sorry'
        );

      } else if (error) {
        return (
          'Error'
        );

      } else if (cancelled) {
        return (
          'Sorry'
        );
      }
      return (
        'Other'
      );

    };
    const eventTitle = chooseEventTitle();

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
          handleDeleteEvent={ this.handleDelete }
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
          userID={ this.props.userID }
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

            <ModalWrapper>

              <ModalView>
                <View style={{ paddingVertical: 4 }}>
                  <Icon name="warning" size={iconScale(24)} color={colours.white} />
                </View>
                <GeneralText style={[{ color: colours.white, paddingVertical: 12 }]}>Please Confirm</GeneralText>
                <MessageText style={[{ color: colours.lightgray, paddingVertical: 4 }]}>Are you sure you want</MessageText>
                <MessageText style={[{ color: colours.lightgray, paddingVertical: 4 }]}>to delete this event?</MessageText>

                <View style={{ justifyContent: 'space-between', marginTop: 40, flexDirection: 'row' }}>
                  <ConfirmButton
                    style={{ backgroundColor: colours.green, borderColor: colours.green, borderWidth: 3, height: 60 }}
                    onPress={ () => {
                      this.setState({
                        isModalVisible: false
                      });

                    }}
                  >
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <Icon2 name="restore" size={iconScale(24)} color={colours.offWhite} />
                      <ConfirmButtonText> KEEP</ConfirmButtonText>
                    </View>
                  </ConfirmButton>
                  <ConfirmButton
                    style={{ backgroundColor: colours.offWhite, borderColor: colours.red, borderWidth: 3, height: 60 }}
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
                      <Icon name="trash" color={colours.red} size={iconScale(24)} />
                      <ConfirmButtonText style={{ color: colours.red }}> DELETE</ConfirmButtonText>
                    </View>
                  </ConfirmButton>
                </View>

              </ModalView>

            </ModalWrapper>

          </Modal>

          <View style={{ marginTop: Platform.OS === 'ios' ? 0 : 0 }}>
            {
              this.props.event && this.eventRouter()
            }
          </View>
          <MessageText style={{ textAlign: 'center' }}>or</MessageText>
          <TouchableHighlight
            style={{ paddingVertical: 20, paddingHorizontal: 20, flexDirection: 'row', alignSelf: 'center' }}
            onPress={ () => this.handleDelete(this.props.event, this.props.event.event_id) }
          >
            <View style={{ flexDirection: 'row' }}>

              <DeleteIcon color={colours.main} />
              <ForgotPasswordText>
              Delete this event
              </ForgotPasswordText>
            </View>
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}
