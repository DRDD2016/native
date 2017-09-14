import React from 'react';
import { View, Dimensions, Image, Platform } from 'react-native';
import { Header } from 'react-navigation';

export default function ImageHeader (props) {
  
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: Header.HEIGHT
      }}
    >
      <Header {...props} style={{ backgroundColor: 'transparent' }} />
      <Image
        source={require('../../../img/bannerDiagTop.png')}
        style={{
          top: Platform.OS === 'ios' ? -5 : -5,
          opacity: 0.3,
          height: Platform.OS === 'ios' ? 150 : 150,
          width: Dimensions.get('window').width * 1,
          position: 'absolute'
        }}
      />
    </View>
  );
}
