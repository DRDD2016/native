/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Image, Text } from 'react-native';
import rsvpsArea from './confirmed-event/rsvps-area';
import { eventNote } from '../../lib/confirmed-event-helpers';
import formatDate from '../../lib/formatDate';
import styles from '../../../styles';


const ConfirmedEvent = ({ event, event_id, rsvps, invitees, userIsHost, RSVPToEvent }) => {


  const handleClick = !userIsHost ? RSVPToEvent : '';

  const going = rsvps.going;
  const notGoing = rsvps.not_going;
  const maybe = rsvps.maybe;
  const respondedList = going.concat(maybe, notGoing);


  const placeNameLong = (event._where[0] && event._where[0].placeName > 18);

  return (
    <View>
      <Text>Event note</Text>
      <View style={styles.row}>
        <Text>
          What
        </Text>
        <View>
          <Text>{ event._what[0] || 'TBC' }</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text>
          Where
        </Text>
        <View>
          { (!placeNameLong) &&
            <Text style={styles.placeNameShort}>{ event._where[0].placeName || 'TBC' }</Text>
          }
          { (placeNameLong) &&
            <Text style={styles.placeNameLong}>{ event._where[0].placeName || 'TBC' }</Text>
          }
          <Text>{ event._where[0].placeAddress }</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text>
          When
        </Text>

        <View>
          <View style={styles.date}>
            <Text>{ 'TBC' }</Text>
          </View>
          <View style={styles.time}>
            <Text>{ 'TBC' }</Text>
          </View>
        </View>
      </View>
    </View>
  );

};

export default ConfirmedEvent;
