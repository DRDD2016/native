import PropTypes from 'prop-types';
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import formatDate from '../lib/format-date';
import CardSection from './common/CardSection';
import StatusFlag from './general/statusFlag';
import styles from '../../styles';
import { TimeText, SubjectNameText, SubjectActionText, EventNameText, FeedItemWhenText, FeedItemWhereText } from '../../styles/text';
import colours from '../../styles/colours';
import { verticalScale, feedHorizPaddingScale, feedVertPaddingScale, moderateScale } from '../../styles/scaling';

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

    const whenUnConfirmedItem =
          (when.length > 1) ||
          (when.length === 1 && when[0].date === '');

    const whereUnConfirmedItem =
          (where.length > 1) ||
          (where.length === 1 && where[0] === '');

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

          marginLeft: feedHorizPaddingScale(2),
          marginRight: feedHorizPaddingScale(2),
          backgroundColor: !viewed ? colours.white : colours.white,
          opacity: !viewed ? 1 : 1 }}

      >
        <CardSection style={{ justifyContent: 'flex-start' }}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginLeft: feedHorizPaddingScale(2),
              marginRight: feedHorizPaddingScale(2),
              paddingTop: feedVertPaddingScale(4),
              paddingBottom: feedVertPaddingScale(4),
              backgroundColor: colours.white,
              borderTopWidth: !viewed ? 0.0 : 0.0,
              borderBottomWidth: !viewed ? 1 : 1,
              borderColor: !viewed ? colours.sectionBorder : colours.sectionBorder,
              flexDirection: 'row',
              justifyContent: 'space-around' }}
            onPress={this._onPress}
          >

            <View style={{ flex: 1, maxWidth: 120, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Image
                source={{ uri: photo_url }}
                defaultSource={avatar}
                style={{
                width: '100%',
                aspectRatio: 1 / 1,
                alignSelf: 'center',
                borderRadius: 3,
                marginTop: 2,
                marginBottom: 2 }}
              />
            </View>

            <View style={{ flex: 3, paddingBottom: 5, paddingLeft: feedHorizPaddingScale(4), paddingRight: feedHorizPaddingScale(4) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: feedVertPaddingScale(4) }}>
                <TimeText opacity={!viewed ? 1 : 0.8} >
                  { moment(timestamp).startOf().fromNow() }
                </TimeText>

              </View>

              <Text style={{ paddingBottom: feedVertPaddingScale(4) }}>
                <SubjectNameText opacity={ !viewed ? 1 : 0.4 }>
                  { userIsSubject && 'You'}
                  { !userIsSubject && `${firstname}  ${surname}` }
                </SubjectNameText>
                <SubjectActionText opacity={ !viewed ? 1 : 0.6 }>
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

                </SubjectActionText>
              </Text>
              <EventNameText opacity={ !viewed ? 1 : 0.8 }
              >
                { name }
              </EventNameText>

            </View>

            <View
              style={{
                opacity: !viewed ? 1 : 1,
                flex: moderateScale(1.5),
                backgroundColor: colours.verylightgray,
                flexDirection: 'column',
                borderLeftColor: colours.lightgray,
                borderLeftWidth: 0.5,
                borderRadius: 3,
                paddingHorizontal: feedHorizPaddingScale(2),
                alignItems: 'center'
              }}
            >

              <StatusFlag isCancelled={isCancelled} is_poll={is_poll} />

              <View style={[{ flex: 1, justifyContent: 'space-around' }, whenUnConfirmedItem && styles.unConfirmedItemStyle]}>

                <View style={{ flexDirection: 'row', marginBottom: 2, justifyContent: 'center', alignItems: 'center' }}>

                  {
                    (when.length > 1 &&
                      <View
                        style={{ width: verticalScale(12), marginLeft: feedHorizPaddingScale(2), alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Icon name="calendar-o"
                          style={{ fontSize: verticalScale(12), textAlign: 'center' }}
                          color={!viewed ? colours.when : colours.when} />
                      </View>) ||
                    (when.length === 1 && when[0].date === '' &&
                      <View
                        style={{ fontSize: verticalScale(12), marginLeft: feedHorizPaddingScale(2), alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Icon name="calendar-o"
                          style={{ fontSize: verticalScale(12), textAlign: 'center' }}
                          color={!viewed ? colours.when : colours.when}
                        />
                      </View>
                    )
                  }
                  <View style={{ paddingHorizontal: feedHorizPaddingScale(2) }}>
                    <FeedItemWhenText
                      unConfirmedItem={whenUnConfirmedItem}
                      viewed={viewed}
                    >
                      {
                        (when.length > 1 && 'VOTE') ||
                        (when.length === 1 && when[0].date === '' && 'TBC') ||
                        formatDate(when[0]).toUpperCase()
                      }
                    </FeedItemWhenText>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 2, justifyContent: 'center', alignItems: 'center' }}>

                  {
                    (where.length > 1 &&
                      <View
                        style={{ width: verticalScale(12), marginLeft: feedHorizPaddingScale(2), justifyContent: 'center', alignItems: 'center' }}
                      >
                        <Icon2 name="location"
                          style={{ fontSize: verticalScale(12), textAlign: 'center' }}
                          color={!viewed ? colours.where : colours.where} />
                      </View>) ||
                    (where.length === 1 && where[0] === '' &&
                      <View
                        style={{ marginLeft: feedHorizPaddingScale(2), alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Icon2 name="location"
                          style={{ fontSize: verticalScale(12), textAlign: 'center' }}
                          color={!viewed ? colours.where : colours.where} />
                      </View>)
                  }
                  <View style={{ paddingHorizontal: feedHorizPaddingScale(2) }}>
                    <FeedItemWhereText
                      numberOfLines={2}
                      unConfirmedItem={whereUnConfirmedItem}
                      viewed={viewed}
                    >
                      {
                        (where.length > 1 && 'VOTE') ||
                        (where.length === 1 && where[0] === '' && 'TBC') ||
                        where[0]
                      }
                    </FeedItemWhereText>
                  </View>
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
