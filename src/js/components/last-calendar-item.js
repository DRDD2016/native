/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CardSection from './common/CardSection';
import colours from '../../styles/colours';


/***
* CalendarItem is used in calendar and album views. Plays equivalent role
to FeedItem.jsx for feed view
***/

class LastCalendarItem extends PureComponent {


  render () {

    return (
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


                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={[colours.when, colours.white]}
                  style={{ height: 55, width: 3 }} />
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

    );
  }
}

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
