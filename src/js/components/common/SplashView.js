/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Image, View } from 'react-native';
import Spinner from '../common/Spinner';
import { feedHorizPaddingScale } from '../../../styles/scaling';

const logo = require('../../../img/sparkLoginLogo.png');

export default function SplashView () {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
      <View style={{ justifyContent: 'center', alignItems: 'center', height: '20%', width: '100%', paddingHorizontal: feedHorizPaddingScale(10) }}>
        <Image style={{ width: '100%', height: '100%' }} source={ logo } />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Spinner />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />

    </View>
  );
}
