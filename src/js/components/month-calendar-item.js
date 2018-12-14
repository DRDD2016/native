/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import CardSection from './common/CardSection';
import colours from '../../styles/colours';
import { moderateScale, feedHorizPaddingScale, feedVertPaddingScale } from '../../styles/scaling';
import { MonthText } from '../../styles/text';


/***
* CalendarItem is used in calendar and album views. Plays equivalent role
to FeedItem.jsx for feed view
***/

class MonthCalendarItem extends PureComponent {


  render () {

    const { month, firstMonth } = this.props;

    return (
      <View style={{ marginLeft: 5, marginRight: 5, borderRadius: 15, backgroundColor: colours.background }}>
        <CardSection style={{ justifyContent: 'flex-start' }}>

          <View
            style={{
              flex: 1,
              paddingLeft: feedHorizPaddingScale(5),
              marginRight: feedHorizPaddingScale(5),
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                width: moderateScale(55),
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >

              <View style={{
                width: moderateScale(3),
                height: feedVertPaddingScale(5),
                backgroundColor: firstMonth ? 'transparent' : colours.when }} />

            </View>
          </View>


          <View
            style={{
              flex: 1,
              paddingLeft: 0,
              marginRight: 0,
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}

          >
            <View style={{

              height: moderateScale(25),
              width: '100%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: 8,
              borderRadius: 0,
              backgroundColor: colours.when,
              borderColor: colours.blue,
              borderWidth: 0 }}
            >
              <MonthText numberOfLines={1}>
                { month }
              </MonthText>
            </View>


          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: feedHorizPaddingScale(5),
              marginRight: feedHorizPaddingScale(5),
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                width: moderateScale(55),
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >

              <View style={{
                width: moderateScale(3),
                height: feedVertPaddingScale(5),
                backgroundColor: colours.when }} />

            </View>
          </View>
        </CardSection>
      </View>

    );
  }
}


export default MonthCalendarItem;

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
