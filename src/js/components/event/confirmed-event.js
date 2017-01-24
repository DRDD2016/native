/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import ConfirmWhat from '../create/confirm-what';
import ConfirmWhere from '../create/confirm-where';
import ConfirmWhen from '../create/confirm-when';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const inslineStyle = {
  greenButton: {
    flexBasis: 100,
    fontSize: 16,
    paddingHorizontal: 8
  },
  orangeButton: {
    flexBasis: 100,
    fontSize: 16,
    paddingHorizontal: 8,
    backgroundColor: colours.orange,
    borderColor: colours.orange
  },
  redButton: {
    flexBasis: 100,
    fontSize: 16,
    paddingHorizontal: 8,
    backgroundColor: colours.red,
    borderColor: colours.red
  }
};

const ConfirmedEvent = ({ event, event_id, rsvps, invitees, userIsHost, rsvpToEvent }) => {
  const handleClick = !userIsHost ? rsvpToEvent : '';

  const going = rsvps.going;
  const notGoing = rsvps.not_going;
  const maybe = rsvps.maybe;
  const respondedList = going.concat(maybe, notGoing);


  const placeNameLong = (event.where[0] && event.where[0].placeName > 18);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignSelf: 'flex-start' }}>
            <Image source={require('../../../img/avatar.png')} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
          </View>
          <View style={{ alignSelf: 'center', marginHorizontal: 10 }}>
            <Text>{event.description}</Text>
            <Text>{ event.note && event.note }</Text>
          </View>
        </View>
        <ConfirmWhat data={ event.what } />
        <ConfirmWhere data={ event.where } />
        <ConfirmWhen data={ event.when } />
        {
          !userIsHost &&
          <View style={{ marginTop: 10, borderTopColor: '#efefef', borderTopWidth: 1 }}>
            <Text style={{ margin: 10 }}>RSVPs</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button
                buttonStyle={[styles.confirmButton, inslineStyle.greenButton]}
                textStyle={styles.confirmButtonText}
                onPress={ () => handleClick('going', event_id) }
              >
                <Text>Going</Text>
              </Button>

              <Button
                buttonStyle={[styles.confirmButton, inslineStyle.orangeButton]}
                textStyle={styles.confirmButtonText}
                onPress={ () => handleClick('maybe', event_id) }
              >
                <Text>Maybe</Text>
              </Button>

              <Button
                buttonStyle={[styles.confirmButton, inslineStyle.redButton]}
                textStyle={styles.confirmButtonText}
                onPress={ () => handleClick('notGoing', event_id) }
              >
                <Text>Not Going</Text>
              </Button>
            </View>
          </View>
        }
      </ScrollView>
    </View>
  );

};

export default ConfirmedEvent;
