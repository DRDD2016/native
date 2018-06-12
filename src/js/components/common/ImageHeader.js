import React from 'react';
import { View, Dimensions, ImageBackground } from 'react-native';
import { Header } from 'react-navigation';
import colours from '../../../styles/colours';

export default function ImageHeader (props) {
  // console.log('Header.HEIGHT: ', Header.HEIGHT);

  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: colours.white,
        // marginTop: -5,
        height: Header.HEIGHT,
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
    >

      <ImageBackground
        source={require('../../../img/AppBannerDiagTop.png')}
        style={{
          borderColor: 'blue',
          borderWidth: 1,
          opacity: 0.6,
          flex: 1,
          zIndex: 0,
          // position: 'absolute',

          width: Dimensions.get('window').width * 1
          // height: Platform.OS === 'ios' ? Header.HEIGHT + 15 : Header.HEIGHT,
          // resizeMode: Image.resizeMode.contain

        }}

      >
        <Header {...props} style={{ flex: 1, zIndex: 1, backgroundColor: 'rgba(255, 255, 255, 0.6)' }} />
      </ImageBackground>


    </View>
  );
}
