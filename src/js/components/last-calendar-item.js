/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CardSection from './common/CardSection';
import colours from '../../styles/colours';
import { moderateScale, scale, feedHorizPaddingScale } from '../../styles/scaling';


/***
* CalendarItem is used in calendar and album views. Plays equivalent role
to FeedItem.jsx for feed view
***/

const LastCalendarItem = () => {

  return (
    <View style={{ marginLeft: 5, marginRight: 5, backgroundColor: colours.background }}>
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

            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={[colours.when, colours.white]}
              style={{ height: scale(55), width: moderateScale(3) }} />

          </View>
        </View>


      </CardSection>
    </View>

  );
};

export default LastCalendarItem;

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
