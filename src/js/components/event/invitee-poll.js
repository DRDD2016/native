
/* eslint-disable no-else-return */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PollButton from '../general/poll-button';
import CategoryDetails from './category-details';
// import { WhatSection, WhereSection, WhenSection } from './poll-sections';
import styles from '../../../styles';

export class InviteePoll extends Component {

  constructor () {
    super();

    this.state = {};

    this.toggleSelection = this.toggleSelection.bind(this);
  }

  toggleSelection (category, selection, nodeIndex) {
    if (!this.state[category].includes(selection)) { // if this hasn't been selected already

      this.setState({
        [category]: this.state[category].concat([selection]),
        selectedNodes: this.state.selectedNodes.concat([nodeIndex])
      }, () => {
        console.table(this.state);
      });
    } else {
      const selectionLocation = this.state[category].indexOf(selection);
      const nodeIndexLocation = this.state.selectedNodes.indexOf(nodeIndex);
      const newSelection = [...this.state[category]];
      newSelection.splice(selectionLocation, 1);
      const newNodes = [...this.state.selectedNodes];
      newNodes.splice(nodeIndexLocation, 1);
      console.log('OLD', this.state[category], 'NEW', newSelection);
      this.setState({
        [category]: newSelection,
        selectedNodes: newNodes
      }, () => {
        console.table(this.state);
      });
    }
  }

  // voteButtonText = this.props.hasMadeChoice ? 'VOTE AGAIN' : 'VOTE';

  render () {
    const { event, toggleSelection, poll, handleVote, //eslint-disable-line
      event_id } = this.props;
    return (
      <View>
        <Text>POLL (INVITEE VIEW)</Text>
        <CategoryDetails
          category={'what'}
          data={event._what}
        />

        <CategoryDetails
          category={'where'}
          data={event._where}
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


export default InviteePoll;
