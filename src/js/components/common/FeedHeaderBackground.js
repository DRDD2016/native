import React from 'react';
import { Image, Platform } from 'react-native';
import { Header } from 'react-navigation';
import colours from '../../../styles/colours';
import { scale } from '../../../styles/scaling';

export default function HeaderBack ({ children }) {
  return (

    <Image
      style={{
        flexDirection: 'row',
        flex: 1,
        // width: Dimensions.get('window').width * 1,
        // resizeMode: Image.resizeMode.contain,
        height: Platform.OS === 'ios' ? scale(Header.HEIGHT) : scale(Header.HEIGHT),
        backgroundColor: colours.transparent
      }}
      source={require('../../../img/AppBannerDiagBottom.png')}

    >
      {children}
    </Image>


  );
}
