import React, { Component } from 'react';
import { View, Text } from 'react-native';
import InviteePoll from './invitee-poll';
import HostPoll from './host-poll';
import FinalisedEvent from './finalised-event';
import colours from '../../../styles/colours';
import Button from '../common/Button';

export default class Event extends Component {

  static route = {
    navigationBar: {
      title (params) {
        if (params.name === undefined) {
          return 'Sorry...';
        }
        return params.name;
      },
      renderRight: (route) => {
        return route.params.userIsHost && !route.params.isPoll ?
          <Button
            onPress={ () => route.params.handleEdit(route.params.event) }
            buttonStyle={{ margin: 15 }}
            textStyle={{ color: colours.white, fontWeight: '600' }}
          >
            <Text>Edit</Text>
          </Button> :
          null;
      },
      backgroundColor: colours.blue,
      tintColor: colours.white
    }
  }

  eventRouter () {
    if (this.props.error) {
      return (
        <View>
          <Text>This event has been cancelled!</Text>
        </View>
      );
    } else if (this.props.userIsHost && this.props.isPoll) {
      return (
        <HostPoll
          navigator={this.props.navigator}
          vote_count={ this.props.vote_count }
          event={ this.props.event }
          finalChoices={ this.props.finalChoices }
          handleConfirmEvent={ this.props.handleConfirmEvent }
          voteCount={ this.props.voteCount }
          handleInviteMoreFriends={ this.props.handleInviteMoreFriends }
        />
      );
    } else if (!this.props.userIsHost && this.props.isPoll) {
      return (
        <InviteePoll
          navigator={this.props.navigator}
          event={ this.props.event }
          voteSaved={this.props.voteSaved}
          handleVote={ this.props.handleVote }
          voteCount={ this.props.voteCount }
        />
      );
    } else { // eslint-disable-line no-else-return
      return (
        <FinalisedEvent
          navigator={this.props.navigator}
          event={ this.props.event }
          event_id={ this.props.event_id }
          userIsHost={ this.props.userIsHost }
          rsvps={ this.props.rsvps }
          rsvpToEvent={ this.props.rsvpToEvent }
          handleDeleteEvent={ this.props.handleDeleteEvent }
          handleInviteMoreFriends={ this.props.handleInviteMoreFriends }
        />
      );
    }
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        {
          this.props.event && this.eventRouter()
        }
      </View>
    );
  }
}
