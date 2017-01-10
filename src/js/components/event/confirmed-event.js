/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Image, Text } from 'react-native';
import RSVPsArea from './confirmed-event/RSVPs-area';
import { eventNote } from '../../lib/confirmed-event-helpers';
import formatDate from '../../lib/formatDate';
import styles from '../../../styles';


const ConfirmedEvent = ({ event, eventID, RSVPs, invitees, userIsHost,
  RSVPToEvent, handleUploadPhoto, photos, deletedPhotos, handleDeletePhoto,
  handleSharePhoto, file, handleSetFile, getSelectedPhoto, hasPhotoLoaded }) => {


  const handleClick = !userIsHost ? RSVPToEvent : '';

  const going = RSVPs.going;
  const notGoing = RSVPs.notGoing;
  const maybe = RSVPs.maybe;
  const respondedList = going.concat(maybe, notGoing);

  const notRespondedList = (responded, invitees) => {

    const notResponded = invitees.filter(invitedUser => responded.indexOf(invitedUser.id) === -1);

    return notResponded.map((user) => {
      return (
        <View style={styles.item} key={ user.id }>
          <Image style={styles.uiAvatarImage} source={{ uri: user.photoURL }} />
          <View style={styles.content}>
            <Text style={styles.headerRsvpListItems}>{ user.firstName }</Text>
          </View>
        </View>
      );
    });
  };

  const placeNameLong = (event.eventWhere[0] && event.eventWhere[0].placeName > 18);

  return (
    <View>
      <View>
        { eventNote(event) }
        <View style={styles.row}>
          <Text>
            What
          </Text>
          <View>
            { event.eventWhat[0] || 'TBC' }
          </View>
        </View>

        <View style={styles.row}>
          <Text>
            Where
          </Text>
          <View>
            { (!placeNameLong) &&
              <Text style={styles.placeNameShort}>{ event.eventWhere[0].placeName || 'TBC' }</Text>
            }
            { (placeNameLong) &&
              <Text style={styles.placeNameLong}>{ event.eventWhere[0].placeName || 'TBC' }</Text>
            }
            <Text>{ event.eventWhere[0].placeAddress }</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text>
            When
          </Text>

          <View>
            <View style={styles.date}>
              { formatDate(event.eventWhen[0].date, true) || 'TBC' }
            </View>
            <View style={styles.time}>
              { event.eventWhen[0].time || 'TBC' }
            </View>
          </View>
        </View>

        <RSVPsArea
          eventID={ eventID }
          respondedList={ respondedList }
          notRespondedList={ notRespondedList }
          invitees={ invitees }
          handleClick={ handleClick }
          RSVPs={ RSVPs }
        />

        <Text>Upload panel goes here</Text>
        <Text>Photo stream goes here</Text>

      </View>

    </View>
  );

};

export default ConfirmedEvent;
