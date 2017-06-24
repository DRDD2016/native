import PropTypes from 'prop-types';
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../lib/format-date';
import CardSection from './common/CardSection';
import Card from './common/Card';
import styles from '../../styles';
import colours from '../../styles/colours';

/***
* CalendarItem is used in calendar and album views. Plays equivalent role
to FeedItem.jsx for feed view
***/

const CalendarItem = ({ event_id, name, where, when, coverPhoto, rsvpStatus, userIsHost, handleOnPress }) => {
  return (
    <Card style={styles.cardStyle}>
      <CardSection style={styles.cardSectionCalendar}>
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: 2,
            marginRight: 1,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
          onPress={() => handleOnPress(event_id)}
        >
          <View style={{ flex: 1, alignItems: 'flex-start' }}>

            <View style={{ alignItems: 'flex-start', marginBottom: 3 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View>
                  {(userIsHost || rsvpStatus === 'going') &&
                    <Icon name="check-circle" size={20} color={colours.green} />
                  }
                  {!userIsHost && rsvpStatus === 'maybe' &&
                    <Icon name="question-circle" size={20} color={colours.orange} />
                  }
                  {!userIsHost && rsvpStatus === 'not_going' &&
                    <Icon name="times-circle" size={20} color={colours.red} />
                  }
                  {!userIsHost && rsvpStatus === 'not_responded' &&
                    <Icon name="exclamation-circle" size={20} color={colours.gray} />
                  }
                </View>

                <Text numberOfLines={1} style={{ alignItems: 'center', fontSize: 16, fontWeight: '700', color: colours.black, paddingLeft: 3 }}>
                  { name }
                </Text>

              </View>
            </View>

            <View>

              <View style={{ flexDirection: 'row', marginRight: 5 }}>
                <View style={{ width: 14, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name="calendar-o" size={14} color={colours.darkgray} />
                </View>
                <View>
                  <Text style={{ fontSize: 14, marginLeft: 5, marginRight: 5, color: colours.darkgray, fontWeight: '600' }}>
                    { `${formatDate(when[0]).toUpperCase() || 'TBC'}` }
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 2 }}>
                <View style={{ width: 14, justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Icon name="map-marker" size={14} color={colours.darkgray} />
                </View>
                <View>
                  <Text numberOfLines={2} style={{ fontSize: 12, marginLeft: 5, marginRight: 5, color: colours.darkgray }}>
                    { `${where[0] || 'TBC'}` }
                  </Text>
                </View>
              </View>

            </View>

          </View>

          <View style={{ marginLeft: 5, borderWidth: 1, borderColor: colours.lightgray, padding: 2 }}>

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
