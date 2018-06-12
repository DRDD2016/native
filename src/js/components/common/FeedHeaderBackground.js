import React from 'react';
import { ImageBackground, Platform } from 'react-native';
import { Header } from 'react-navigation';
import colours from '../../../styles/colours';
import { scale } from '../../../styles/scaling';

export default function HeaderBack ({ children }) {
  return (

    <ImageBackground
      style={{
        flexDirection: 'row',
        flex: 1,
        // width: Dimensions.get('window').width * 1,
        // resizeMode: Image.resizeMode.contain,
        height: Platform.OS === 'ios' ? scale(50) : scale(Header.HEIGHT),
        backgroundColor: colours.transparent
      }}
      source={require('../../../img/AppBannerDiagBottom.png')}

    >
      {children}
    </ImageBackground>


  );
}
