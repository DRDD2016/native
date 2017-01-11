/* eslint-disable*/
/* eslint-disable no-else-return */
import React from 'react';
import { View } from 'react-native';
import PollButton from '../general/poll-button';
import { EventWhatSection, EventWhereSection, EventWhenSection } from './poll-sections';
import Button from '../common/Button';
import styles from '../../../styles';

const InviteePoll = ({ event, toggleSelection, poll, handleVote, //eslint-disable-line
  event_id, isHost, hasVoted }) => { //eslint-disable-line

  const eventWhat = createPollSelections(event, toggleSelection, poll, 'eventWhat', EventWhatSection);
  const eventWhere = createPollSelections(event, toggleSelection, poll, 'eventWhere', EventWhereSection);
  const eventWhen = createPollSelections(event, toggleSelection, poll, 'eventWhen', EventWhenSection);

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
        { eventWhat }
      </View>
      <View style={styles.eventWhere}>
        { eventWhere }
      </View>
      <View style={styles.eventWhen}>
        { eventWhen}
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

    if (poll[eventType]) {

      return (
        <Button
          onClick={ () => toggleSelection(eventType, i) }
          key={ `${eventType}-${i}` }
        >

          <EventTypeComponent
            text={ choice }
            choiceClasses={ selectedClasses }
            labelClasses={ hideClasses }
          />
        </Button>
      );
    } else {

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
