import React from 'react';
import { Image, Platform } from 'react-native';
import { Header } from 'react-navigation';
import colours from '../../../styles/colours';


export default function HeaderBack ({ children }) {
  return (

    <Image
      style={{
        flexDirection: 'row',
        flex: 1,
        // width: Dimensions.get('window').width * 1,
        // resizeMode: Image.resizeMode.contain,
        height: Platform.OS === 'ios' ? Header.HEIGHT : Header.HEIGHT,
        backgroundColor: colours.transparent
      }}
      source={require('../../../img/AppBannerDiagBottom.png')}

    >
      {children}
    </Image>


  );
}
