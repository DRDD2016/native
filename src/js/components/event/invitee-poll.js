
/* eslint-disable no-else-return */
import React from 'react';
import { Text, View } from 'react-native';
import PollButton from '../general/poll-button';
import CategoryDetails from './category-details';
// import { WhatSection, WhereSection, WhenSection } from './poll-sections';
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
        voteButtonText={ voteButtonText }
      />
    </View>
  );
};


export default InviteePoll;
