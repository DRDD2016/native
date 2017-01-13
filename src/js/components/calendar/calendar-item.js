import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../../lib/formatDate';
import CardSection from '../common/CardSection';
import Card from '../common/Card';
import styles from '../../../styles';

/***
* CalendarItem is used in calendar and album views. Plays equivalent role
to FeedItem.jsx for feed view
***/

const CalendarItem = ({ what, where, when,
 coverPhoto, rsvpStatus, userIsHost }) => {
  // need to add onPress handler for Button.
  return (
    <Card style={styles.cardStyle}>
      <CardSection style={styles.cardSectionCalendar}>
        <TouchableOpacity style={styles.cardButtonStyle}>
          <View style={styles.leftColumn}>

            <View style={styles.cardTopRow}>

              <View>
                {(userIsHost || rsvpStatus === 'going') &&
                  <Icon name="check-circle" size={20} color="green" />
                }
                {!userIsHost && rsvpStatus === 'maybe' &&
                  <Icon name="question-circle" size={20} color="orange" />
                }
                {!userIsHost && rsvpStatus === 'notGoing' &&
                  <Icon name="times-circle" size={20} color="red" />
                }
                {!userIsHost && rsvpStatus === null &&
                  <Icon name="exclamation-circle" size={20} color="gray" />
                }
              </View>

              <Text style={styles.calendarTitle}>
                { what }
              </Text>

            </View>

            <View style={styles.cardMiddleRow}>

              <Text style={styles.date}>
                <Icon name="calendar-o" size={14} color="gray" />
                { ` ${formatDate(when[0].date).toUpperCase() || 'TBC'}` }
              </Text>

              <Text style={styles.placeName}>
                <Icon name="map-marker" size={14} color="gray" />
                { ` ${where[0].placeName || 'TBC'} ${where[0].placeAddress}` }
              </Text>

            </View>

          </View>

          <View style={styles.rightColumnCalendar}>

            <Image
              style={styles.coverImage}
              source={coverPhoto ? { uri: coverPhoto.photo_url } : require('../../../img/placeholder.png')}
            />

          </View>

        </TouchableOpacity>
      </CardSection>
    </Card>

  );
};

export default CalendarItem;
