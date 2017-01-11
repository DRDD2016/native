import React from 'react';
import moment from 'moment';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getUserID from '../lib/getUserID';
import formatDate from '../lib/formatDate';
// import Button from './common/Button';
import CardSection from './common/CardSection';
import Card from './common/Card';
import styles from '../../styles';

moment.locale('en-gb');

const Notification = ({ eventID, timestamp, firstName, lastName, photoURL,
  eventWhere, eventWhen, userIsHost, isPoll, subjectID,
  index, handleUpdateNotification, viewed, inviteesNumber, eventName, hasEdited }) => {

  const userIsSubject = subjectID === getUserID();

  const viewedNotification = viewed === true;
// ADD THE OnClick button to Link! --<
  return (
    <Card style={[styles.cardStyle, viewedNotification && styles.viewedNotificationStyle]}>
      <CardSection style={styles.cardSectionNotification}>
        <TouchableOpacity
          style={styles.cardButtonStyle}
          onPress={ () => handleUpdateNotification(index) }
          to={ `event/${eventID}` }
        >

          <View style={styles.leftColumn}>
            <Image style={styles.uiProfilePhotoCircularImage} source={{ uri: photoURL }} />
          </View>
          <View style={styles.middleColumn}>
            <Text style={styles.timestamp}> { moment(timestamp).startOf().fromNow() } </Text>
            <Text>
              <Text style={styles.subjectName}>
                { userIsSubject && 'You'}
                { !userIsSubject && `${firstName}  ${lastName}` }
              </Text>
              <Text style={styles.subjectAction}>
                { userIsSubject && isPoll && ' have created a poll ' }
                { userIsSubject && !isPoll && !hasEdited && ' have created an event ' }
                { userIsSubject && !isPoll && hasEdited && ' have edited an event' }

                { !userIsSubject && userIsHost && isPoll && ' has voted on your poll' }
                { !userIsSubject && userIsHost && !isPoll && ' has responded to your event' }

                { !userIsSubject && !userIsHost && isPoll && ' wants you to vote on their poll' }
                { !userIsSubject && !userIsHost && !isPoll && !hasEdited && ' has invited you to their event' }
                { !userIsSubject && !userIsHost && !isPoll && hasEdited && ' has edited an event' }

              </Text>
            </Text>
            <Text style={styles.eventName}>
              { eventName }
            </Text>

            <View>
              <Text style={styles.numberOfInvites}>
                { userIsSubject && userIsHost && ` invitation sent to ${inviteesNumber} friends` }
              </Text>
            </View>
          </View>

          <View style={styles.rightColumnFeed}>

            <Text style={styles.date}>
              <Icon name="calendar-o" size={14} color="gray" />
              {
                (eventWhen.length > 1 && 'VOTE') ||
                (eventWhen.length === 1 && eventWhen[0].date === '' && 'TBC') ||
                formatDate(eventWhen[0].date).toUpperCase()
              }
            </Text>
            <Text style={styles.placeName}>
              <Icon name="map-marker" size={14} color="gray" />
              {
                (eventWhere.length > 1 && 'VOTE') ||
                (eventWhere.length === 1 && eventWhere[0].placeName === '' && 'TBC') ||
                eventWhere[0].placeName
              }
            </Text>
          </View>

        </TouchableOpacity>
      </CardSection>
    </Card>
  );
};

export default Notification;
