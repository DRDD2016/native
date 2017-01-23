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

const ConfirmedEvent = ({ event, event_id, rsvps, invitees, userIsHost, rsvpToEvent }) => {
  const handleClick = !userIsHost ? rsvpToEvent : '';

  const going = rsvps.going;
  const notGoing = rsvps.not_going;
  const maybe = rsvps.maybe;
  const respondedList = going.concat(maybe, notGoing);


  const placeNameLong = (event.where[0] && event.where[0].placeName > 18);

  return (
    <View>
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
        <View>
          {
            !userIsHost &&
            <Button
              buttonStyle={styles.confirmButton}
              textStyle={styles.confirmButtonText}
            >
              <Text>RSVP to this event</Text>
            </Button>
          }
        </View>
      </ScrollView>
    </View>
  );

};

export default ConfirmedEvent;
