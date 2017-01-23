import React from 'react';
import { View, Text } from 'react-native';
import InviteePoll from './invitee-poll';
import HostPoll from './host-poll';
import ConfirmedEvent from './confirmed-event';
import Spinner from '../common/Spinner';
import DeletedEvent from './deleted-event';
import colours from '../../../styles/colours';
import Button from '../common/Button';

export default class Event extends React.Component {

  static route = {
    navigationBar: {
      title (params) {
        if (params.name === undefined) {
          return '';
        }
        return params.name;
      },
      renderRight: (route) => {
        return route.params.userIsHost
          ? <Button
            onPress={ () => route.params.navigator.push('edit')}
            buttonStyle={{ margin: 15 }}
            textStyle={{ color: colours.white, fontWeight: '600' }}
          >
            <Text>Edit</Text></Button>
          : null;
      },
      backgroundColor: colours.blue,
      tintColor: colours.white
    }
  }

  componentDidMount () {
    setTimeout(() => {
      if (this.props.userIsHost) {
        this.props.navigator.updateCurrentRouteParams({
          name: this.props.event.name,
          userIsHost: this.props.userIsHost,
          navigator: this.props.navigator
        });
      } else {
        this.props.navigator.updateCurrentRouteParams({
          name: this.props.event.name
        });
      }
    }, 300);
  }

  eventRouter () {

    if (this.props.userIsHost && this.props.isPoll) {
      return (
        <HostPoll
          navigator={this.props.navigator}
          vote_count={ this.props.vote_count }
          event={ this.props.event }
          handleConfirmEvent={ this.props.handleConfirmEvent }
        />
      );
    } else if (!this.props.userIsHost && this.props.isPoll) {
      return (
        <InviteePoll
          navigator={this.props.navigator}
          event={ this.props.event }
          handleVote={ this.props.handleVote }
        />
      );
    } else { // eslint-disable-line no-else-return
      return (
        <ConfirmedEvent
          navigator={this.props.navigator}
          event={ this.props.event }
          event_id={ this.props.event_id }
          userIsHost={ this.props.userIsHost }
          rsvps={ this.props.rsvps }
          rsvpToEvent={ this.props.rsvpToEvent }
          invitees={ this.props.invitees }
        />
      );
    }
  }

  render () {
    return (
      <View style={{ padding: 10 }}>
        {
          this.props.isFetching && <Spinner />
        }
        {
          !this.props.isFetching && (this.props.event === false) && <DeletedEvent />
        }
        {
          !this.props.isFetching && this.props.event && this.eventRouter()
        }
      </View>
    );
  }
}
