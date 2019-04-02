/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { styles, ButText } from '../../../styles';
import colours from '../../../styles/colours';
import { moderateScale } from '../../../styles/scaling';

const windowWidth = Dimensions.get('window').width;
console.log('windowWidth:', windowWidth);

const avatar = require('../../../img/avatar.png');

export default class MessageBubble extends Component {

  render () {
    const { messageDirection, messageText, photo_url, messageDate, sender } = this.props;

    return (
      <View
        style={{
          marginLeft: 2,
          marginRight: 2,
          flexDirection: 'row',
          paddingVertical: 5,
          marginTop: 5,
          paddingLeft: messageDirection === 'left' ? 4 : 0,
          paddingRight: messageDirection === 'right' ? 4 : 0,
          justifyContent: 'space-between',
          alignItems: 'flex-start' }}
      >
        {
          messageDirection === 'right' &&

          <View style={{ backgroundColor: colours.white, borderRadius: 3, paddingHorizontal: 4 }}>

            <Image
              source={{ uri: photo_url }}
              defaultSource={avatar}
              style={[styles.uiProfilePhotoMessage, { width: (windowWidth > 600) ? moderateScale(40) : moderateScale(30),
                aspectRatio: 1 / 1,
                // height: (windowWidth > 600) ? moderateScale(40) : moderateScale(30),
                alignSelf: 'center',
                borderRadius: 3
              }]}
            />
            <ButText style={{ textAlign: 'center', color: colours.main }}>
              {sender}
            </ButText>
            <ButText style={{ textAlign: 'center' }} color={colours.gray}>
              {messageDate}
            </ButText>
          </View>
        }
        <View
          style={{ // bubble container
            flex: 1,
            flexDirection: 'row',
            paddingRight: messageDirection === 'left' ? 8 : 0,
            paddingLeft: messageDirection === 'right' ? 8 : 0,
            alignItems: 'flex-start',
            marginTop: 1,
            // borderTopWidth: 0.5,
            // borderTopColor: colours.lightgray,
            // borderTopLeftRadius: 5,

            elevation: 1,
            shadowOpacity: 0.8,
            shadowRadius: 0.25,
            shadowColor: colours.lightgray,
            shadowOffset: { width: 0, height: -1 }
          }}
        >
          <View style={{ // message rectangle
            flex: 1,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderTopLeftRadius: messageDirection === 'left' ? 5 : 0,
            borderTopRightRadius: messageDirection === 'right' ? 5 : 0,
            paddingHorizontal: 6,
            paddingVertical: 4,

            elevation: 1,
            shadowOpacity: 0.8,
            shadowRadius: 1,
            shadowColor: colours.gray,
            shadowOffset: { width: 0, height: 1 },

            backgroundColor: colours.messageColor }}>

            <View style={{
              paddingBottom: 2,
              // borderColor: 'red',
              // borderWidth: 1,
              backgroundColor: 'transparent' }}>
              <ButText color={colours.darkgray}>{ messageText }</ButText>
            </View>
          </View>
          <View style={{ // triangle
            position: 'absolute',
            right: messageDirection === 'left' ? 0 : null,
            left: messageDirection === 'right' ? 0 : null,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderRightWidth: messageDirection === 'left' ? 8 : 0,
            borderTopWidth: 8,
            borderRightColor: messageDirection === 'left' ? 'transparent' : null,
            borderLeftWidth: messageDirection === 'right' ? 8 : 0,
            borderLeftColor: messageDirection === 'right' ? 'transparent' : null,
            borderTopColor: colours.messageColor,

            elevation: 1,
            shadowOpacity: 0.8,
            shadowRadius: 0.25,
            shadowColor: colours.lightgray,
            shadowOffset: { width: 1, height: 1 }

          }}
          />

        </View>
        {
          messageDirection === 'left' &&

          <View style={{ backgroundColor: colours.white, borderRadius: 3, paddingHorizontal: 4 }}>

            <Image
              source={{ uri: photo_url }}
              defaultSource={avatar}
              style={[styles.uiProfilePhotoMessage, { width: (windowWidth > 600) ? moderateScale(40) : moderateScale(30),
                aspectRatio: 1 / 1,
                // height: 40,
                alignSelf: 'center',
                borderRadius: 3
              }]}
            />
            <ButText style={{ fontSize: 12, paddingTop: 2, textAlign: 'center', color: colours.main }}>
              {sender}
            </ButText>
            <ButText style={{ fontSize: 12, textAlign: 'center' }} color={colours.gray}>
              {messageDate}
            </ButText>
          </View>
        }


      </View>
    );
  }
}
