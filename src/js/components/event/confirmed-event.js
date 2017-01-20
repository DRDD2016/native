/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Image, Text } from 'react-native';
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
      <Text>CONFIRMED EVENT</Text>
      <View style={styles.row}>
        <ConfirmWhat data={ event.what } />
      </View>

      <View style={styles.row}>
        <ConfirmWhere data={ event.where } />
      </View>

      <View style={styles.row}>
        <ConfirmWhen data={ event.when } />
      </View>

      <View>
        {
          userIsHost &&
          <Button
            buttonStyle={styles.confirmButton}
            textStyle={styles.confirmButtonText}
          >
            <Text>Edit event details</Text>
          </Button>
        }
      </View>

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

    </View>
  );

};

export default ConfirmedEvent;
