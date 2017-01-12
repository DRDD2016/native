/* eslint-disable */
/* eslint-disable no-else-return */
import React from 'react';
import { View, Text } from 'react-native';
import { EventWhatSection, EventWhereSection, EventWhenSection } from './poll-sections';
import HostCreateEventButton from './host-create-event-button';
import Button from '../common/Button';
import styles from '../../../styles';

const HostPoll = ({ event, tally, finalChoices, //eslint-disable-line
  handleHostEventChoices, handleConfirmEvent, event_id  }) => { //eslint-disable-line
  // const what = createVoteSection(event, tally, '_what', EventWhatSection, handleHostEventChoices, finalChoices);
  // const where = createVoteSection(event, tally, '_where', EventWhereSection, handleHostEventChoices, finalChoices);
  // const when = createVoteSection(event, tally, '_when', EventWhenSection, handleHostEventChoices, finalChoices);

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
        <View><Text>WHAT</Text></View>
      </View>
      <View style={styles.row}>
        <View><Text>WHERE</Text></View>
      </View>
      <View style={styles.row}>
        <View><Text>WHEN</Text></View>
      </View>

      <HostCreateEventButton
        finalChoices={ finalChoices }
        handleConfirmEvent={ handleConfirmEvent }
        event_id={ event_id }
      />

    </View>
  );
};

export default HostPoll;
