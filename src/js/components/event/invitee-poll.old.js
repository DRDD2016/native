/* eslint-disable*/
/* eslint-disable no-else-return */
import React from 'react';
import { Text, View } from 'react-native';
import PollButton from '../general/poll-button';
import { EventWhatSection, EventWhereSection, EventWhenSection } from './poll-sections';
import Button from '../common/Button';
import styles from '../../../styles';

const InviteePoll = ({ event, toggleSelection, poll, handleVote, //eslint-disable-line
  event_id, isHost, hasVoted }) => { //eslint-disable-line

    console.log("event", event);
  const voteButtonText = hasVoted ? 'VOTE AGAIN' : 'VOTE';

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
      { eventNote(event) }

      <View style={styles.eventWhat}>
        {
          event._what.map((choice, i) => {
            return
            <EventWhatSection
              type={ 'what' }
              index={ i }
              isOption={ event._what }
              toggleSelection={ toggleSelection }
              text={ choice }
              choiceClasses={ selectedClasses }
              labelClasses={ hideClasses }
            />
          })
        }
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


function createPollSelections (event, toggleSelection, poll, eventType, EventTypeComponent) {


  return event[eventType].map((choice, i) => {

    const selectedClasses = (poll[eventType] === undefined || poll[eventType][i] === true);
    const hideClasses = i > 0;

    if (poll[eventType]) { // if this category has multiple options

      return (
        <EventTypeComponent
          key={ `${eventType}-${i}` }
          type={ eventType }
          index={ i }
          isOption={ !!poll[eventType] }
          toggleSelection={ toggleSelection }
          text={ choice }
          choiceClasses={ selectedClasses }
          labelClasses={ hideClasses }
        />
      );
    } else { // if this category is firm

      return (
        <Button
          key={ `${eventType}-${i}` }
        >
          <EventTypeComponent
            text={ choice }
            choiceClasses={ selectedClasses }
            labelClasses={ hideClasses }
          />
        </Button>
      );
    }
  });
}


export default InviteePoll;
