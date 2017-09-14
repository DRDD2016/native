import React from 'react';
import { View, Dimensions, Image, Platform } from 'react-native';
import colours from '../../../styles/colours';

export default function HeaderBack (props) {
  return (
    <View
      style={[{
        width: Dimensions.get('window').width * 1,
        top: Platform.OS === 'ios' ? -80 : -80,
        position: 'absolute'
      }, props.style]}
    >
      <Image
        style={{ height: Platform.OS === 'ios' ? 150 : 170, width: Dimensions.get('window').width * 1 }}
        source={require('../../../img/bannerDiagTop.png')}
      >
        <View
          style={[{
            width: Dimensions.get('window').width * 1,
            height: Platform.OS === 'android' ? 0 : 26,
            top: Platform.OS === 'android' ? 0 : 10,
            backgroundColor: colours.white,
            borderWidth: 0,
            borderColor: 'green'
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
      </Image>

    </View>
  );
}
