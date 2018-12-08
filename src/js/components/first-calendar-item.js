/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import CardSection from './common/CardSection';
import MonthCalendarItem from './month-calendar-item';
import colours from '../../styles/colours';


/***
* CalendarItem is used in calendar and album views. Plays equivalent role
to FeedItem.jsx for feed view
***/

class FirstCalendarItem extends PureComponent {


  render () {

    const { showMonth, calendarMonth } = this.props;


    return (
      <View>
        {
          showMonth &&
          <MonthCalendarItem month={calendarMonth} firstMonth />

        }
        {
          !showMonth &&

          <View style={{ marginLeft: 5, marginRight: 5, backgroundColor: colours.background }}>
            <CardSection style={{ justifyContent: 'flex-start' }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingLeft: 5,
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
                        marginLeft: 0,
                        padding: 0,
                        height: 35,
                        width: 65,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        backgroundColor: colours.white,
                        borderColor: colours.when,
                        borderWidth: 0 }}
                    >
                      <View style={{ flex: 1, width: 3, backgroundColor: 'transparent' }} />
                      <View style={{

                        height: 25,
                        width: 55,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        backgroundColor: colours.when,
                        borderColor: colours.when,
                        borderWidth: 3 }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{ fontSize: 14, color: colours.white, fontWeight: '600' }}
                        >
                          { moment().format('DD MMM') }
                        </Text>
                      </View>
                      <View style={{ flex: 1, width: 3, backgroundColor: colours.when }} />
                    </View>

                    <View style={{ flex: 1, width: 3, backgroundColor: colours.when }} />
                  </View>
                </View>
                <View
                  style={{ flex: 4,
                    paddingBottom: 5,
                    marginTop: 5,
                    marginLeft: 5,
                    marginRight: 2,
                    paddingLeft: 5,
                    alignItems: 'flex-start',
                    justifyContent: 'center' }}
                />

              </TouchableOpacity>
            </CardSection>
          </View>
        }
      </View>

    );
  }
}


export default FirstCalendarItem;

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
