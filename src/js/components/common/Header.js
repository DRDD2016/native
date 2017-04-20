import React from 'react';
import { View, Dimensions, Image } from 'react-native';
import colours from '../../../styles/colours';

export default function Header (props) {
  return (
    <View
      style={[{
        width: Dimensions.get('window').width * 1,
        top: -80,
        position: 'absolute'
      }, props.style]}
    >
      <Image
        style={{ height: 150, width: Dimensions.get('window').width * 1 }}
        source={require('../../../img/bannerDiagTop.png')}
      >
        <View
          style={[{
            width: Dimensions.get('window').width * 1,
            height: 26,
            top: 10,
            backgroundColor: colours.white
          }, props.style]}
        />
        <View
          style={[{
            width: Dimensions.get('window').width * 1,
            height: 44,
            top: 10,
            backgroundColor: colours.white,
            opacity: 0.6
          }, props.style]}
        />
      </Image>

    </View>
  );
}
