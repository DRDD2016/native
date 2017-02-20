/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { PropTypes } from 'react';
import moment from 'moment';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../lib/format-date';
import CardSection from './common/CardSection';
import Card from './common/Card';
import styles from '../../styles';

moment.locale('en-gb');

const FeedItem = ({ user_id, event_id, timestamp, firstname, surname,
  photo_url, where, when, userIsHost, is_poll, subject_user_id,
  handleSelection, viewed, inviteesNumber, name, edited }) => {
  console.log('user_id', user_id);
  const userIsSubject = subject_user_id === user_id;
  return (
    <Card style={[styles.cardStyle, viewed && styles.viewedFeedItemStyle]}>
      <CardSection style={styles.cardSectionFeedItem}>
        <TouchableOpacity
          style={styles.cardButtonStyle}
          onPress={ () => handleSelection(event_id) }
        >

          <View style={styles.leftColumn}>
            <Image style={styles.uiProfilePhotoCircularImage} source={{ uri: photo_url }} />
          </View>
          <View style={styles.middleColumn}>
            <Text style={styles.timestamp}> { moment(timestamp).startOf().fromNow() } </Text>
            <Text>
              <Text style={styles.subjectName}>
                { userIsSubject && 'You'}
                { !userIsSubject && `${firstname}  ${surname}` }
              </Text>
              <Text style={styles.subjectAction}>
                { userIsSubject && is_poll && ' have created a poll ' }
                { userIsSubject && !is_poll && !edited && ' have created an event ' }
                { userIsSubject && !is_poll && edited && ' have edited an event' }

                { !userIsSubject && userIsHost && is_poll && ' has voted on your poll' }
                { !userIsSubject && userIsHost && !is_poll && ' has responded to your event' }

                { !userIsSubject && !userIsHost && is_poll && ' wants you to vote on their poll' }
                { !userIsSubject && !userIsHost && !is_poll && !edited && ' has invited you to their event' }
                { !userIsSubject && !userIsHost && !is_poll && edited && ' has edited an event' }

              </Text>
            </Text>
            <Text style={styles.name}>
              { name }
            </Text>

            <View>
              <Text style={styles.numberOfInvites}>
                { inviteesNumber && userIsSubject && userIsHost && ` invitation sent to ${inviteesNumber} friends` }
              </Text>
            </View>
          </View>

          <View style={styles.rightColumnFeed}>

            <Text style={styles.date}>
              <Icon name="calendar-o" size={14} color="gray" />
              {
                (when.length > 1 && 'VOTE') ||
                (when.length === 1 && when[0].date === '' && 'TBC') ||
                formatDate(when[0]).toUpperCase()
              }
            </Text>
            <Text style={styles.placeName}>
              <Icon name="map-marker" size={14} color="gray" />
              {
                (where.length > 1 && 'VOTE') ||
                (where.length === 1 && where[0].placeName === '' && 'TBC') ||
                where[0].placeName
              }
            </Text>
          </View>

        </TouchableOpacity>
      </CardSection>
    </Card>
  );
};
FeedItem.propTypes = {
  event_id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  timestamp: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  where: PropTypes.array.isRequired,
  when: PropTypes.array.isRequired,
  userIsHost: PropTypes.bool.isRequired,
  is_poll: PropTypes.bool.isRequired,
  subject_user_id: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired,
  edited: PropTypes.bool,
  viewed: PropTypes.bool,
  inviteesNumber: PropTypes.number
};

export default FeedItem;
