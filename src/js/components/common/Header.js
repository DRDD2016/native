import React from 'react';
import { View, Dimensions, ImageBackground, Platform } from 'react-native';
import colours from '../../../styles/colours';

export default function Header (props) {
  return (
    <View
      style={[{
        width: Dimensions.get('window').width * 1,
        top: Platform.OS === 'ios' ? -80 : -80,
        position: 'absolute'
        // borderWidth: 2
        // borderColor: 'blue'
      }, props.style]}
    >
      <ImageBackground
        style={{ height: Platform.OS === 'ios' ? 190 : 190, width: Dimensions.get('window').width * 1 }}
        source={require('../../../img/AppBannerDiagBottom.png')}
      >
        <View
          style={[{
            width: Dimensions.get('window').width * 1,
            height: Platform.OS === 'android' ? 0 : 26,
            top: Platform.OS === 'android' ? 0 : 10,
            backgroundColor: colours.white,
            borderWidth: 0,
            borderColor: 'pink'
          }, props.style]}
        />
        <View
          style={[{
            width: Dimensions.get('window').width * 1,
            height: Platform.OS === 'android' ? 60 : 44,
            top: Platform.OS === 'android' ? -120 : 10,
            backgroundColor: colours.white,
            opacity: 0.6
          }, props.style]}
        />
      </ImageBackground>

    </View>
  );
}
