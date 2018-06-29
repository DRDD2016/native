import PropTypes from 'prop-types';
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../lib/format-date';
import CardSection from './common/CardSection';
import StatusFlag from './general/statusFlag';
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
      viewed, name, edited, isCancelled, action } = this.props;

    // console.log('name: ', name);
    // console.log('viewed: ', viewed);
    // console.log('action: ', action);

    const unConfirmedItem =
          (when.length > 1) ||
          (when.length === 1 && when[0].date === '');

    const userIsSubject = subject_user_id === user_id;
    const avatar = require('../../img/avatar.png');

    if (!userIsSubject && userIsHost && !is_poll && (action === 'notResponded')) {
      return null;
      // do not show this: ' has joined but not responded to your event'
    }

    if (!userIsSubject && userIsHost && is_poll && (action === 'notResponded')) {
      return null;
      // do not show this: ' has joined but not responded to your poll'
    }

    return (
      <View
        style={{
          marginLeft: 2,
          marginRight: 2,
          backgroundColor: !viewed ? colours.white : colours.white,
          opacity: !viewed ? 1 : 0.6 }}

      >
        <CardSection style={{ justifyContent: 'flex-start' }}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginLeft: 2,
              marginRight: 2,
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor: colours.white,
              borderTopWidth: !viewed ? 0.5 : 0.5,
              borderBottomWidth: !viewed ? 0.5 : 0.5,
              borderColor: !viewed ? colours.lightgray : colours.lightgray,
              flexDirection: 'row',
              justifyContent: 'space-around' }}
            onPress={this._onPress}
          >

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>

              <StatusFlag isCancelled={isCancelled} is_poll={is_poll} />

              <Image
                source={{ uri: photo_url }}
                defaultSource={avatar}
                style={[styles.uiProfilePhotoCircularImage, { marginTop: 5 }]}
              />

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
                  { userIsSubject && is_poll && !isCancelled && (action === 'create') && ' have created a poll ' }
                  { userIsSubject && !is_poll && !edited && !isCancelled && (action === 'create') && ' have created an event ' }
                  { userIsSubject && userIsHost && !isCancelled && (action === 'finalised') && ' have confirmed an event' }
                  { userIsSubject && !is_poll && edited && !isCancelled && (action === 'edited') && ' have edited an event' }
                  { userIsSubject && userIsHost && isCancelled && ' have cancelled an event' }

                  { !userIsSubject && userIsHost && is_poll && (action === 'vote') && ' has voted on your poll' }
                  { !userIsSubject && userIsHost && !is_poll && (action === 'rsvp') && ' has responded to your event' }
                  { !userIsSubject && userIsHost && !is_poll && (action === 'notResponded') && ' has joined but not responded to your event' }
                  { !userIsSubject && userIsHost && is_poll && (action === 'notResponded') && ' has joined but not responded to a poll' }

                  { userIsSubject && !userIsHost && is_poll && !isCancelled && (action === 'vote') && ' have voted on a poll' }
                  { userIsSubject && !userIsHost && !is_poll && !isCancelled && (action === 'notResponded') && ' have been invited to' }
                  { userIsSubject && !userIsHost && is_poll && !isCancelled && (action === 'notResponded') && ' were asked to vote on' }
                  { userIsSubject && !userIsHost && !is_poll && !isCancelled && (action === 'rsvp') && ' have responded to' }

                  { !userIsSubject && !userIsHost && is_poll && !isCancelled && (action === 'notResponded') && ' wants you to vote on their poll' }
                  { !userIsSubject && !userIsHost && !is_poll && !edited && !isCancelled && (action === 'notResponded') && ' has invited you to' }
                  { !userIsSubject && !userIsHost && !isCancelled && (action === 'finalised') && ' has confirmed an event' }
                  { !userIsSubject && !userIsHost && !is_poll && edited && !isCancelled && (action === 'edited') && ' has edited an event' }
                  { !userIsSubject && !userIsHost && !is_poll && isCancelled && ' has cancelled an event' }

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
                        <Icon name="calendar-o" size={14} color={!viewed ? colours.when : colours.lightgray} />
                      </View>) ||
                    (when.length === 1 && when[0].date === '' &&
                      <View
                        style={{ marginLeft: 5, flex: 1, alignItems: 'center' }}
                      >
                        <Icon name="calendar-o" size={14} color={!viewed ? colours.when : colours.lightgray} />
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
                        <Icon name="map-marker" size={14} color={!viewed ? colours.where : colours.lightgray} />
                      </View>) ||
                    (where.length === 1 && where[0] === '' &&
                      <View
                        style={{ marginLeft: 5, flex: 1, alignItems: 'center' }}
                      >
                        <Icon name="map-marker" size={14} color={!viewed ? colours.where : colours.lightgray} />
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
      </View>
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
