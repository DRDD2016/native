/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Image, Text } from 'react-native';
import rsvpsArea from './confirmed-event/RSVPs-area';
import { eventNote } from '../../lib/confirmed-event-helpers';
import formatDate from '../../lib/format-date';
import styles from '../../../styles';


const ConfirmedEvent = ({ event, event_id, rsvps, invitees, userIsHost,
  rsvpToEvent, handleUploadPhoto, photos, deletedPhotos, handleDeletePhoto,
  handleSharePhoto, file, handleSetFile, getSelectedPhoto, hasPhotoLoaded }) => {


  const handleClick = !userIsHost ? rsvpToEvent : '';

  const going = rsvps.going;
  const notGoing = rsvps.not_going;
  const maybe = rsvps.maybe;
  const respondedList = going.concat(maybe, notGoing);

  const notRespondedList = (responded, invitees) => {

    const notResponded = invitees.filter(invitedUser => responded.indexOf(invitedUser.id) === -1);

    return notResponded.map((user) => {
      return (
        <View style={styles.item} key={ user.id }>
          <Image style={styles.uiAvatarImage} source={{ uri: user.photo_url }} />
          <View style={styles.content}>
            <Text style={styles.headerRsvpListItems}>{ user.firstname }</Text>
          </View>
        </View>
      );
    });
  };

  const placeNameLong = (event._where[0] && event._where[0].placeName > 18);

  return (
    <View>
      <View>
        { eventNote(event) }
        <View style={styles.row}>
          <Text>
            What
          </Text>
          <View>
            { event._what[0] || 'TBC' }
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
              { formatDate(event._when[0].date, true) || 'TBC' }
            </View>
            <View style={styles.time}>
              { event._when[0].time || 'TBC' }
            </View>
          </View>
        </View>

        <rsvpsArea
          event_id={ event_id }
          respondedList={ respondedList }
          notRespondedList={ notRespondedList }
          invitees={ invitees }
          handleClick={ handleClick }
          rsvps={ rsvps }
        />

        <Text>Upload panel goes here</Text>
        <Text>Photo stream goes here</Text>

      </View>

    </View>
  );

};

export default ConfirmedEvent;
