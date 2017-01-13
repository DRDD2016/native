/* eslint-disable*/
/* eslint-disable no-else-return */
import React from 'react';
import { Text, View } from 'react-native';
import PollButton from '../general/poll-button';
// import { WhatSection, WhereSection, WhenSection } from './poll-sections';
import Button from '../common/Button';
import styles from '../../../styles';

const InviteePoll = ({ event, toggleSelection, poll, handleVote, //eslint-disable-line
  event_id, isHost, hasMadeChoice }) => { //eslint-disable-line


  const voteButtonText = hasMadeChoice ? 'VOTE AGAIN' : 'VOTE';

  function eventNote (event) {

    if (event.eventNote !== '') {
      return (
        <View style={styles.eventNote}>
          { event.eventNote }

        </View>
      );
    }
  }

  return (
    <View style={styles.Poll}>
      <Text>POLL (INVITEE VIEW)</Text>

      <View style={styles.eventWhat}>
        <Text>WHAT</Text>
      </View>
      <View style={styles.eventWhere}>
        <Text>WHERE</Text>
      </View>
      <View style={styles.eventWhen}>
        <Text>WHEN</Text>
      </View>

      <PollButton
        poll={ poll }
        handleVote={ handleVote }
        event_id={ event_id }
        voteButtonText={ voteButtonText }
      />

    </View>
  );
};


export default InviteePoll;
