
/* eslint-disable no-else-return */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PollButton from '../general/poll-button';
import CategoryDetails from './category-details';

export default class InviteePoll extends Component {

  constructor () {
    super();

    this.state = {
      what: [],
      where: [],
      when: []
    };
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  toggleSelection (category, selection) {
    if (!this.state[category].includes(selection)) {

      this.setState({
        [category]: this.state[category].concat([selection])
      }, () => {
        console.table(this.state);
      });
    } else {
      const selectionIndex = this.state[category].indexOf(selection);
      const newSelection = [...this.state[category]];
      newSelection.splice(selectionIndex, 1);

      this.setState({
        [category]: newSelection
      }, () => {
        console.table(this.state);
      });
    }
  }

  render () {
    const { event, poll, handleVote, event_id } = this.props;
    return (
      <View>
        <Text>POLL (INVITEE VIEW)</Text>
        <CategoryDetails
          category={'what'}
          data={event._what}
          toggleSelection={this.toggleSelection}
        />

        <CategoryDetails
          category={'where'}
          data={event._where}
          toggleSelection={this.toggleSelection}
        />

        <PollButton
          poll={ poll }
          handleVote={ handleVote }
          event_id={ event_id }
          voteButtonText={ 'VOTE' }
        />
      </View>
    );
  }
}
