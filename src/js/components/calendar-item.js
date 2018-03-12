import PropTypes from 'prop-types';
/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../lib/format-date';
import CardSection from './common/CardSection';
import styles from '../../styles';
import colours from '../../styles/colours';

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
    console.log('calendar-item props:', this.props);

    const { key, name, where, when, rsvpStatus, userIsHost, isCancelled, host_firstname, host_photo_url, rsvps } = this.props;
    // coverPhoto to be added as prop when used
    // console.log('where:', where);
    // console.log('when:', when);
    // console.log('photo_url:', host_photo_url);
    console.log('host_firstname:', host_firstname);
    // console.log('name:', name);

    console.log('rsvps:', JSON.stringify(rsvps));
    console.log('key cal item:', key);

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
        <CardSection style={{ justifyContent: 'flex-start' }}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginLeft: 5,
              marginRight: 5,
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
            onPress={this._onPress}
          >
            <View
              style={{
                width: 55,
                flexDirection: 'row' }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center' }}
              >
                <View style={{ flex: 1, width: 3, backgroundColor: colours.when }} />
                <View
                  style={{
                    padding: 5,
                    height: 55,
                    width: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 30,
                    backgroundColor: colours.when }}
                >
                  {when[1] && <Text style={{ fontSize: 10, color: colours.white }}>from</Text>}
                  <Text numberOfLines={1} style={{ fontSize: 12, color: colours.white }}>{formatDate(when[0]).toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1, width: 3, backgroundColor: colours.when }} />
              </View>
            </View>
            <View
              style={{ flex: 4,
                paddingBottom: 5,
                marginTop: 5,
                marginLeft: 5,
                paddingLeft: 10,
                alignItems: 'flex-start',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderColor: colours.lightgray }}
            >

              <View style={{ alignItems: 'flex-start', marginBottom: 3 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  {!isCancelled &&
                    <View>
                      {(userIsHost && rsvpStatus === 'going') &&
                        <Text style={{ alignItems: 'center', fontSize: 12, fontWeight: '500', color: colours.gray, paddingLeft: 3 }}>
                          You are hosting
                        </Text>
                      }
                      {(!userIsHost && rsvpStatus === 'going') &&
                        <Text style={{ alignItems: 'center', fontSize: 12, fontWeight: '500', color: colours.gray, paddingLeft: 3 }}>
                          You are going to
                        </Text>
                      }
                      {!userIsHost && rsvpStatus === 'maybe' &&
                        <Text style={{ alignItems: 'center', fontSize: 12, fontWeight: '500', color: colours.gray, paddingLeft: 3 }}>
                          You are maybe for
                        </Text>
                      }
                      {!userIsHost && rsvpStatus === 'not_going' &&
                        <Text style={{ alignItems: 'center', fontSize: 12, fontWeight: '500', color: colours.gray, paddingLeft: 3 }}>
                          You are not going to
                        </Text>
                      }
                      {!userIsHost && rsvpStatus === 'not_responded' &&
                        <Text style={{ alignItems: 'center', fontSize: 12, fontWeight: '500', color: colours.gray, paddingLeft: 3 }}>
                          You have not responded to
                        </Text>
                      }
                    </View>
                  }

                </View>
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

                  {!isCancelled &&
                    <Text style={{ alignItems: 'center', fontSize: 16, fontWeight: '700', color: colours.black, paddingLeft: 3 }}>
                      { `${name}` }
                    </Text>
                  }
                  {isCancelled &&
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <Text style={{ textDecorationLine: 'line-through', fontSize: 16, fontWeight: '700', color: colours.red, paddingLeft: 3 }}>
                        { `${name}` }
                      </Text>
                      <Text style={{ fontSize: 12, fontWeight: '500', color: colours.red, paddingLeft: 3 }}>
                        cancelled
                      </Text>
                    </View>
                  }

                </View>
              </View>

              <View>

                { (when[0] && when[1]) ?
                  <View style={{ flexDirection: 'row', marginRight: 5 }}>
                    <View style={{ width: 14, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="calendar-o" size={14} color={colours.when} />
                    </View>
                    <View>
                      <Text style={{ fontSize: 14, marginLeft: 5, marginRight: 5, color: colours.when, fontWeight: '600' }}>
                        {whenText}
                      </Text>
                    </View>
                  </View>
                :
                  <View style={{ flexDirection: 'row', marginRight: 5 }}>
                    <View style={{ width: 14, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="calendar-o" size={14} color={colours.when} />
                    </View>
                    <View>
                      <Text style={{ fontSize: 14, marginLeft: 5, marginRight: 5, color: colours.darkgray, fontWeight: '600' }}>
                        {whenText}
                      </Text>
                    </View>
                  </View>
                }

                { whereText === 'POLLING' ?
                  <View style={{ flexDirection: 'row', marginTop: 2 }}>

                    <View style={{ width: 14, justifyContent: 'flex-start', alignItems: 'center' }}>
                      <Icon name="map-marker" size={14} color={colours.where} />
                    </View>
                    <View>

                      <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '600', marginLeft: 5, marginRight: 5, color: colours.where }}>
                        {`${whereText}`}
                      </Text>

                    </View>

                  </View>
                :
                  <View style={{ flexDirection: 'row', marginTop: 2 }}>

                    <View style={{ width: 14, justifyContent: 'flex-start', alignItems: 'center' }}>
                      <Icon name="map-marker" size={16} color={colours.where} />
                    </View>
                    <View>
                      <Text numberOfLines={2} style={{ fontSize: 12, fontWeight: '600', marginLeft: 5, marginRight: 5, color: colours.darkgray }}>
                        {whereText}
                      </Text>
                    </View>

                  </View>
                }

              </View>

            </View>

            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 7,
                paddingBottom: 5,
                marginTop: 5,
                borderBottomWidth: 1,
                borderColor: colours.lightgray,
                paddingRight: 2 }}
            >
              {
                (going + maybe === 0) &&
                <View style={{ flex: 1, alignItems: 'center' }} />
              }
              {
                (going + maybe !== 0) &&
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: colours.green }}>{!going ? '-' : going}</Text>
                  <Text style={{ fontSize: 12, color: colours.green }}>going</Text>
                  <Text style={{ fontSize: 12, color: colours.orange }}>{!maybe ? '-' : maybe}</Text>
                  <Text style={{ fontSize: 12, color: colours.orange }}>maybe</Text>
                </View>
              }

              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center' }}
              >
                <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 5, marginRight: 5, color: colours.darkgray }}>
                  {'Host'}
                </Text>
                <Image
                  source={{ uri: host_photo_url }}
                  defaultSource={avatar}
                  style={[styles.uiProfilePhotoCircularImage, { marginTop: 5 }]}
                />
              </View>

            </View>

          </TouchableOpacity>
        </CardSection>
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
