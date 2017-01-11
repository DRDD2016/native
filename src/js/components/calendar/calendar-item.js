import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../../lib/formatDate';
import CardSection from '../common/CardSection';
import Card from '../common/Card';
import styles from '../../../styles';

/***
* CalendarItem is used in calendar and album views. Plays equivalent role
to Notification.jsx for feed view
***/

const CalendarItem = ({ eventName, eventWhere, eventWhen,
 coverPhoto, RSVPstatus, userIsHost }) => {
  // need to add onPress handler for Button.
  return (
    <Card style={styles.cardStyle}>
      <CardSection style={styles.cardSectionCalendar}>
        <TouchableOpacity style={styles.cardButtonStyle}>
          <View style={styles.leftColumn}>

            <View style={styles.cardTopRow}>

              <View>
                {(userIsHost || RSVPstatus === 'going') &&
                  <Icon name="check-circle" size={20} color="green" />
                }
                {!userIsHost && RSVPstatus === 'maybe' &&
                  <Icon name="question-circle" size={20} color="orange" />
                }
                {!userIsHost && RSVPstatus === 'notGoing' &&
                  <Icon name="times-circle" size={20} color="red" />
                }
                {!userIsHost && RSVPstatus === null &&
                  <Icon name="exclamation-circle" size={20} color="gray" />
                }
              </View>

              <Text style={styles.calendarTitle}>
                { eventName }
              </Text>

            </View>

            <View style={styles.cardMiddleRow}>

              <Text style={styles.date}>
                <Icon name="calendar-o" size={14} color="gray" />
                { ` ${formatDate(eventWhen[0].date).toUpperCase() || 'TBC'}` }
              </Text>

              <Text style={styles.placeName}>
                <Icon name="map-marker" size={14} color="gray" />
                { ` ${eventWhere[0].placeName || 'TBC'} ${eventWhere[0].placeAddress}` }
              </Text>

            </View>

          </View>

          <View style={styles.rightColumnCalendar}>

            <Image
              style={styles.coverImage}
              source={coverPhoto ? { uri: coverPhoto.photoURL } : require('../../../img/placeholder.png')}
            />

          </View>

        </TouchableOpacity>
      </CardSection>
    </Card>

  );
};

export default CalendarItem;
