/* eslint-disable */
/* eslint-disable no-else-return */
import React from 'react';
import { View, Text } from 'react-native';
import { EventWhatSection, EventWhereSection, EventWhenSection } from './poll-sections';
import HostCreateEventButton from './host-create-event-button';
import Button from '../common/Button';
import styles from '../../../styles';

const HostPoll = ({ event, tally, hostEventChoices, //eslint-disable-line
  handleHostEventChoices, handleConfirmEvent, eventID  }) => { //eslint-disable-line
  const eventWhat = createVoteSection(event, tally, 'eventWhat', EventWhatSection, handleHostEventChoices, hostEventChoices);
  const eventWhere = createVoteSection(event, tally, 'eventWhere', EventWhereSection, handleHostEventChoices, hostEventChoices);
  const eventWhen = createVoteSection(event, tally, 'eventWhen', EventWhenSection, handleHostEventChoices, hostEventChoices);

  function eventNote (event) {

    if (event.eventNote !== '') {

      return (
        <View style={styles.eventNote}>
          <Text style={styles.msg2}>
            { event.eventNote }
          </Text>
        </View>
      );
    }
  }

  return (

    <View>
      <View>{ eventNote(event) }</View>

      <View style={styles.row}>
        <View>{ eventWhat }</View>
      </View>
      <View style={styles.row}>
        <View>{ eventWhere }</View>
      </View>
      <View style={styles.row}>
        <View>{ eventWhen }</View>
      </View>

      <HostCreateEventButton
        hostEventChoices={ hostEventChoices }
        handleConfirmEvent={ handleConfirmEvent }
        eventID={ eventID }
      />

    </View>
  );
};

function createVoteSection (event, tally, eventType, EventTypeComponent,
  handleHostEventChoices, hostEventChoices) {

  return event[eventType].map((choice, i) => {

    const selectedClasses =
    (hostEventChoices[eventType] === i || hostEventChoices[eventType] === undefined);
    const hideClasses = i > 0;

    const tallyCount = tally[eventType] ? tally[eventType][i] : '';

    if (tally[eventType]) {
      // console.log(choice);
      // console.log(tallyCount);
      // console.log(selectedClasses);
      // console.log(hideClasses);

      return (
        <Button
          onClick={ () => handleHostEventChoices(eventType, choice, i) }
          key={ `${eventType}-${i}` }
        >
          <EventTypeComponent
            text={ choice }
            tally={ tallyCount }
            choiceClasses={ selectedClasses }
            labelClasses={ hideClasses }
          />
        </Button>
      );
    } else {

      return (
        <View key={ `${eventType}-${i}` }>
          <EventTypeComponent
            text={ choice }
            tally={ tallyCount }
            choiceClasses={ selectedClasses }
            labelClasses={ hideClasses }
          />
        </View>
      );
    }
  });
}

export default HostPoll;
