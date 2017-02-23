/* eslint-disable react/forbid-prop-types */
import React, { PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../lib/format-date';
import CardSection from './common/CardSection';
import Card from './common/Card';
import styles from '../../styles';

/***
* CalendarItem is used in calendar and album views. Plays equivalent role
to FeedItem.jsx for feed view
***/

const CalendarItem = ({ event_id, name, where, when, coverPhoto, rsvpStatus, userIsHost, handleOnPress }) => {
  return (
    <Card style={styles.cardStyle}>
      <CardSection style={styles.cardSectionCalendar}>
        <TouchableOpacity style={styles.cardButtonStyle} onPress={() => console.log('PRESSED', event_id)}>
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
                { name }
              </Text>

            </View>

            <View style={styles.cardMiddleRow}>

              <Text style={styles.date}>
                <Icon name="calendar-o" size={14} color="gray" />
                { ` ${formatDate(when[0]).toUpperCase() || 'TBC'}` }
              </Text>

              <Text style={styles.placeName}>
                <Icon name="map-marker" size={14} color="gray" />
                { ` ${where[0] || 'TBC'}` }
              </Text>

            </View>

          </View>

          <View style={styles.rightColumnCalendar}>

            <Image
              style={styles.coverImage}
              source={coverPhoto ? { uri: coverPhoto.photo_url } : require('../../img/placeholder.png')}
            />

          </View>

        </TouchableOpacity>
      </CardSection>
    </Card>

  );
};

CalendarItem.propTypes = {
  event_id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  name: PropTypes.string.isRequired,
  where: PropTypes.array.isRequired,
  when: PropTypes.array.isRequired,
  rsvpStatus: PropTypes.oneOf([
    'going',
    'maybe',
    'not_going',
    'not_responded'
  ]).isRequired,
  userIsHost: PropTypes.bool.isRequired,
  handleOnPress: PropTypes.func.isRequired
};

export default CalendarItem;
