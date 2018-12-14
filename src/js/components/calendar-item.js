import PropTypes from 'prop-types';
/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import formatDate from '../lib/format-date';
import CardSection from './common/CardSection';
import MonthCalendarItem from './month-calendar-item';
import colours from '../../styles/colours';
import { moderateScale, feedHorizPaddingScale, feedVertPaddingScale } from '../../styles/scaling';
import { CalendarDateText, CalendarFromText, HostNameText, EventNameText } from '../../styles/text';

const avatar = require('../../img/avatar.png');

/***
* CalendarItem is used in calendar and album views. Plays equivalent role
to FeedItem.jsx for feed view
***/

class CalendarItem extends PureComponent {

  _onPress = () => {
    const { handleOnPress, event_id } = this.props;
    handleOnPress(event_id);
  };

  render () {
    // console.log('calendar-item props:', this.props);

    const { name, where, when, rsvpStatus, userIsHost, isCancelled, host_photo_url, rsvps, showMonth, calendarMonth, host_firstname } = this.props;

    const array = rsvps;
    const rsvpsObject = Object.assign({}, ...array);

    const going = !rsvpsObject.going ? 0 : rsvpsObject.going.length;
    const maybe = !rsvpsObject.maybe ? 0 : rsvpsObject.maybe.length;
    // const not_going = !rsvpsObject.not_going ? 0 : rsvpsObject.not_going.length;
    // const not_responded = !rsvpsObject.not_responded ? 0 : rsvpsObject.not_responded.length;
    // console.log('not_going:', not_going);
    // console.log('not_responded:', not_responded);

    let whenText = 'TBC';

    if (when[0] && when[1] && when[2]) {
      whenText = `${'POLLING'}`;
    } else if (when[0] && when[1]) {
      whenText = `${formatDate(when[0]).toUpperCase() || 'TBC'} or ${formatDate(when[1]).toUpperCase() || 'TBC'}`;
    } else if (when[0]) {
      whenText = `${formatDate(when[0]).toUpperCase() || 'TBC'}`;
    }

    let whereText = 'TBC';

    if (where[0] && where[1]) {
      whereText = `${'POLLING'}`;

    } else if (where[0]) {
      whereText = where[0] || 'TBC';
    }


    return (

      <View>
        {
          showMonth &&
          <MonthCalendarItem month={calendarMonth} />

        }


        <View style={{ marginLeft: 5, marginRight: 5, backgroundColor: colours.background }}>
          <CardSection style={{ justifyContent: 'flex-start' }}>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingLeft: feedHorizPaddingScale(5),
                marginRight: feedHorizPaddingScale(5),
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              onPress={this._onPress}
            >
              <View
                style={{
                  width: moderateScale(55),
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <View style={{ flex: 1, width: moderateScale(3), backgroundColor: colours.when }} />
                  <View
                    style={{
                      marginLeft: 0,
                      padding: 0,
                      height: moderateScale(55),
                      width: moderateScale(65),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      backgroundColor: colours.white,
                      borderColor: colours.when,
                      borderWidth: moderateScale(3) }}
                  >
                    {when[1] && <CalendarFromText>from</CalendarFromText>}
                    <CalendarDateText
                      numberOfLines={1}

                    >
                      {formatDate(when[0]).toUpperCase()}
                    </CalendarDateText>
                  </View>
                  <View style={{ flex: 1, width: moderateScale(3), backgroundColor: colours.when }} />
                </View>
              </View>
              <View
                style={{ flex: 4,
                  paddingBottom: feedVertPaddingScale(5),
                  marginTop: feedVertPaddingScale(5),
                  marginLeft: feedHorizPaddingScale(5),
                  marginRight: 2,
                  paddingLeft: moderateScale(5),
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderColor: colours.sectionBorder }}
              >

                <View style={{ alignItems: 'flex-start', marginBottom: feedVertPaddingScale(3) }}>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    {!isCancelled &&
                      <EventNameText style={{ alignItems: 'center', color: colours.main, paddingLeft: 0 }}>
                        {`${name}`}
                      </EventNameText>
                    }
                    {isCancelled &&
                      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <EventNameText style={{ textDecorationLine: 'line-through', color: colours.red, paddingLeft: 3 }}>
                          { `${name}` }
                        </EventNameText>

                      </View>
                    }

                  </View>
                </View>

                <View>

                  { ((!isCancelled) && when[0] && when[1]) ?
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                      <View style={{ width: moderateScale(14), justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="calendar-o" size={moderateScale(14)} color={colours.when} />
                      </View>
                      <View>
                        <Text style={{ fontSize: moderateScale(12), marginLeft: 5, marginRight: 5, color: colours.when, fontWeight: '600' }}>
                          {whenText}
                        </Text>
                      </View>
                    </View>
                  :
                    <View style={{ flexDirection: 'row', marginRight: 5, alignItems: 'center' }}>

                      <View>
                        {(userIsHost || rsvpStatus === 'going') && !isCancelled &&
                          <Icon name="check-circle" size={moderateScale(16)} color={colours.green} />
                        }
                        {!userIsHost && rsvpStatus === 'maybe' && !isCancelled &&
                          <Icon name="question-circle" size={moderateScale(16)} color={colours.orange} />
                        }
                        {!userIsHost && rsvpStatus === 'not_going' && !isCancelled &&
                          <Icon name="times-circle" size={moderateScale(16)} color={colours.red} />
                        }
                        {!userIsHost && rsvpStatus === 'not_responded' && !isCancelled &&
                          <Icon name="exclamation-circle" size={moderateScale(16)} color={colours.gray} />
                        }
                      </View>
                      <View>

                        {(userIsHost || rsvpStatus === 'going') && !isCancelled &&
                          <Text numberOfLines={2}
                            style={{ fontSize: moderateScale(12), fontWeight: '600', marginLeft: 5, marginRight: 5, color: colours.green }} // eslint-disable-line max-len
                          >
                            You are going
                          </Text>
                        }
                        {(!isCancelled && !userIsHost && rsvpStatus === 'maybe') &&
                          <Text numberOfLines={2}
                            style={{ fontSize: moderateScale(12), fontWeight: '600', marginLeft: 5, marginRight: 5, color: colours.orange }} // eslint-disable-line max-len
                          >
                            You are a maybe
                          </Text>
                        }
                        {(!isCancelled && !userIsHost && rsvpStatus === 'not_going') &&
                          <Text numberOfLines={2}
                            style={{ fontSize: moderateScale(12), fontWeight: '600', marginLeft: 5, marginRight: 5, color: colours.red }} // eslint-disable-line max-len
                          >
                            You are not going
                          </Text>
                        }
                        {(!isCancelled && !userIsHost && rsvpStatus === 'not_responded') &&
                          <Text numberOfLines={2}
                            style={{ fontSize: moderateScale(12), fontWeight: '600', marginLeft: 5, marginRight: 5, color: colours.green }} // eslint-disable-line max-len
                          >
                            You have not responded
                          </Text>
                        }
                        {(isCancelled && !userIsHost) &&
                          <Text numberOfLines={2}
                            style={{ fontSize: moderateScale(12), fontWeight: '600', marginLeft: 5, marginRight: 5, color: colours.red }} // eslint-disable-line max-len
                          >
                            This event has been cancelled
                          </Text>
                        }
                        {(isCancelled && userIsHost) &&
                          <Text numberOfLines={2}
                            style={{ fontSize: moderateScale(12), fontWeight: '600', marginLeft: 5, marginRight: 5, color: colours.red }} // eslint-disable-line max-len
                          >
                            You cancelled this event
                          </Text>
                        }

                      </View>

                    </View>
                  }


                  { (!isCancelled) && whereText === 'POLLING' ?
                    <View style={{ flexDirection: 'row', marginTop: feedVertPaddingScale(4) }}>

                      <View style={{ width: moderateScale(14), justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Icon2 name="location" size={moderateScale(14)} color={colours.where} />
                      </View>
                      <View>

                        <Text numberOfLines={2}
                          style={{ fontSize: moderateScale(12), fontWeight: '600', marginLeft: 5, marginRight: 5, color: colours.where }}
                          >
                          {`${whereText}`}
                        </Text>

                      </View>

                    </View>
                  :
                    (!isCancelled) &&
                    <View style={{ flexDirection: 'row', marginTop: feedVertPaddingScale(4) }}>

                      <View style={{ width: moderateScale(14), justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Icon2 name="location" size={moderateScale(14)} color={colours.where} />
                      </View>
                      <View>

                        <Text numberOfLines={2}
                          style={{ fontSize: moderateScale(12), fontWeight: '600', marginLeft: 5, marginRight: 5, color: colours.darkgray }}
                        >
                          {whereText}
                        </Text>

                      </View>

                    </View>
                  }

                </View>

              </View>

              <View
                style={{
                  flex: 3,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: 4,
                  paddingBottom: 5,
                  marginTop: 5,
                  borderBottomWidth: 1,
                  borderColor: colours.sectionBorder,
                  paddingRight: 2 }}
              >
                {
                  (going + maybe === 0) &&
                  <View style={{ flex: 1, marginHorizontal: 2, alignItems: 'center' }} />
                }
                {
                  (going !== 0) &&
                  <View style={{ flex: 1, marginHorizontal: 2, alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: colours.green }}>{!going ? '-' : going}</Text>
                    <Text style={{ fontSize: 12, color: colours.green }}>going</Text>
                  </View>
                }
                {
                  (maybe !== 0) &&
                  <View style={{ flex: 1, marginHorizontal: 2, alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: colours.orange }}>{!maybe ? '-' : maybe}</Text>
                    <Text style={{ fontSize: 12, color: colours.orange }}>maybe</Text>
                  </View>
                }

                <View
                  style={{

                    flex: 2,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center' }}
                >
                  <HostNameText style={{ fontSize: 10, textAlign: 'center', color: colours.gray, marginLeft: 5, marginRight: 5 }}>
                    {'Hosted by'}
                  </HostNameText>

                  <Image
                    source={{ uri: host_photo_url }}
                    defaultSource={avatar}
                    style={{
                    width: '80%',
                    aspectRatio: 1 / 1,
                    alignSelf: 'center',
                    borderRadius: 3,
                    marginTop: 2,
                    marginBottom: 2 }}
                  />

                  <HostNameText style={{ fontSize: 10, marginLeft: 5, marginRight: 5 }}>
                    {host_firstname}
                  </HostNameText>

                </View>

              </View>

            </TouchableOpacity>
          </CardSection>
        </View>
      </View>

    );
  }
}

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

// <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//
//   {!isCancelled &&
//     <View>
//       {(userIsHost && rsvpStatus === 'going') &&
//         <Text style={{ alignItems: 'center', fontSize: 12, fontWeight: '500', color: colours.gray, paddingLeft: 3 }}>
//           You are hosting
//         </Text>
//       }
//       {(!userIsHost && rsvpStatus === 'going') &&
//         <Text style={{ alignItems: 'center', fontSize: 12, fontWeight: '500', color: colours.gray, paddingLeft: 3 }}>
//           You are going to
//         </Text>
//       }
//       {!userIsHost && rsvpStatus === 'maybe' &&
//         <Text style={{ alignItems: 'center', fontSize: 12, fontWeight: '500', color: colours.gray, paddingLeft: 3 }}>
//           You are maybe for
//         </Text>
//       }
//       {!userIsHost && rsvpStatus === 'not_going' &&
//         <Text style={{ alignItems: 'center', fontSize: 12, fontWeight: '500', color: colours.gray, paddingLeft: 3 }}>
//           You are not going to
//         </Text>
//       }
//       {!userIsHost && rsvpStatus === 'not_responded' &&
//         <Text style={{ alignItems: 'center', fontSize: 12, fontWeight: '500', color: colours.gray, paddingLeft: 3 }}>
//           You have not responded to
//         </Text>
//       }
//     </View>
//   }
//
// </View>
