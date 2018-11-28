/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { styles, ButText } from '../../../styles';
import colours from '../../../styles/colours';

const avatar = require('../../../img/avatar.png');

export default class MessageBubble extends Component {

  render () {
    const { messageDirection, messageText, photo_url, messageDate, sender } = this.props;

    return (
      <View
        style={{
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

          <View style={{ width: '20%', backgroundColor: colours.white, borderRadius: 3, paddingHorizontal: 4 }}>

            <Image
              source={{ uri: photo_url }}
              defaultSource={avatar}
              style={[styles.uiProfilePhotoMessage, { width: '100%',
                aspectRatio: 1 / 1,
                // height: 40,
                alignSelf: 'center',
                borderRadius: 3
              }]}
            />
            <Text style={{ textAlign: 'center', color: colours.main }}>
              {sender}
            </Text>
            <ButText style={{ textAlign: 'center' }} color={colours.lightgray}>
              {messageDate}
            </ButText>
          </View>
        }
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            paddingRight: messageDirection === 'left' ? 8 : 0,
            paddingLeft: messageDirection === 'right' ? 8 : 0,
            alignItems: 'flex-start' }}
        >
          <View style={{
            flex: 1,
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderTopLeftRadius: messageDirection === 'left' ? 5 : 0,
            borderTopRightRadius: messageDirection === 'right' ? 5 : 0,
            paddingHorizontal: 6,
            paddingVertical: 4,
            backgroundColor: colours.messageColor }}>

            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
              <ButText color={colours.blue}>{ messageText }</ButText>
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
            borderTopColor: colours.messageColor

          }}
          />

        </View>
        {
          messageDirection === 'left' &&

          <View style={{ width: '20%', backgroundColor: colours.white, borderRadius: 3, paddingHorizontal: 4 }}>

            <Image
              source={{ uri: photo_url }}
              defaultSource={avatar}
              style={[styles.uiProfilePhotoMessage, { width: '100%',
                aspectRatio: 1 / 1,
                // height: 40,
                alignSelf: 'center',
                borderRadius: 3
              }]}
            />
            <Text style={{ textAlign: 'center', color: colours.main }}>
              {sender}
            </Text>
            <ButText style={{ textAlign: 'center' }} color={colours.lightgray}>
              {messageDate}
            </ButText>
          </View>
        }


      </View>
    );
  }
}
