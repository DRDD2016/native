import React from 'react';
import { ImageBackground, Platform, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
import colours from '../../../styles/colours';


export default function HeaderBack ({ children }) {
  return (

    <ImageBackground
      style={{
        flexDirection: 'row',
        // flex: 1,
        width: Dimensions.get('window').width * 1,
        // resizeMode: Image.resizeMode.contain,
        height: Platform.OS === 'ios' ? Header.HEIGHT : Header.HEIGHT,
        backgroundColor: colours.transparent,
        opacity: 0.5
      }}
      

    >
      {children}
    </ImageBackground>


  );
}
