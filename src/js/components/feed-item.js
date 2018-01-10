import PropTypes from 'prop-types';
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import moment from 'moment';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../lib/format-date';
import CardSection from './common/CardSection';
import Card from './common/Card';
import styles from '../../styles';
import colours from '../../styles/colours';

moment.locale('en-gb');

class FeedItem extends PureComponent {

  _onPress = () => {
    const { handleSelection, event_id, viewed, feed_item_id } = this.props;
    handleSelection(event_id, viewed, feed_item_id);
  };

  render () {

    const { user_id, timestamp, firstname, surname,
      photo_url, where, when, userIsHost, is_poll, subject_user_id,
      viewed, name, edited } = this.props;

    console.log('name: ', name);
    console.log('viewed: ', viewed);

    const unConfirmedItem =
          (when.length > 1) ||
          (when.length === 1 && when[0].date === '');

    const userIsSubject = subject_user_id === user_id;

    return (
      <Card style={[styles.cardStyle, !viewed && styles.viewedFeedItemStyle]}>
        <CardSection style={styles.cardSectionFeedItem}>
          <TouchableOpacity
            style={styles.cardButtonStyle}
            onPress={this._onPress}
          >

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Image style={styles.uiProfilePhotoCircularImage} source={{ uri: photo_url }} />
            </View>
            <View style={{ flex: 3, paddingBottom: 5, paddingRight: 3 }}>
              <Text style={[styles.timestamp, !viewed && styles.viewedFeedItemTimestamp]}>
                { moment(timestamp).startOf().fromNow() } </Text>
              <Text>
                <Text style={[styles.subjectName, !viewed && styles.viewedFeedItemName]}>
                  { userIsSubject && 'You'}
                  { !userIsSubject && `${firstname}  ${surname}` }
                </Text>
                <Text style={[styles.subjectAction, !viewed && styles.viewedFeedItemAction]}>
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
              <Text style={[styles.eventName, !viewed && styles.viewedFeedItemName]}>
                { name }
              </Text>

            </View>

            <View style={{ flex: 1.5, flexDirection: 'column', borderLeftColor: colours.lightgray, borderLeftWidth: 0.5 }}>
              <View style={[{ flex: 1, justifyContent: 'space-around' }, unConfirmedItem && styles.unConfirmedItemStyle]}>

                <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>

                  {
                    (when.length > 1 &&
                      <View
                        style={{ marginLeft: 5, flex: 1, alignItems: 'center' }}
                      >
                        <Icon name="calendar-o" size={14} color={colours.gray} />
                      </View>) ||
                    (when.length === 1 && when[0].date === '' &&
                      <View
                        style={{ marginLeft: 5, flex: 1, alignItems: 'center' }}
                      >
                        <Icon name="calendar-o" size={14} color={colours.gray} />
                      </View>
                    )
                  }

                  <Text
                    style={[{ fontSize: 16, flex: 3, marginLeft: 5 },
                      unConfirmedItem && styles.unConfirmedItemText,
                      !viewed && styles.viewedFeedItemDate]}
                  >
                    {
                      (when.length > 1 && 'VOTE') ||
                      (when.length === 1 && when[0].date === '' && 'TBC') ||
                      formatDate(when[0]).toUpperCase()
                    }
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  {
                    (where.length > 1 &&
                      <View
                        style={{ marginLeft: 5, flex: 1, alignItems: 'center' }}
                      >
                        <Icon name="map-marker" size={14} color={colours.gray} />
                      </View>) ||
                    (where.length === 1 && where[0] === '' &&
                      <View
                        style={{ marginLeft: 5, flex: 1, alignItems: 'center' }}
                      >
                        <Icon name="map-marker" size={14} color="gray" />
                      </View>)
                  }

                  <Text
                    numberOfLines={2}
                    style={[{ fontSize: 12, flex: 3, marginLeft: 5 },
                      unConfirmedItem && styles.unConfirmedItemText,
                      !viewed && styles.viewedFeedItemPlaceName]}
                  >
                    {
                      (where.length > 1 && 'VOTE') ||
                      (where.length === 1 && where[0] === '' && 'TBC') ||
                      where[0]
                    }
                  </Text>
                </View>
              </View>

            </View>

          </TouchableOpacity>
        </CardSection>
      </Card>
    );
  }
}

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
  subject_user_id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired,
  edited: PropTypes.bool,
  viewed: PropTypes.bool.isRequired,
  feed_item_id: PropTypes.number.isRequired
};

export default FeedItem;
