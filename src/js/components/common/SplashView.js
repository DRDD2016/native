/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Image, View } from 'react-native';
import Spinner from '../common/Spinner';

const logo = require('../../../img/sparkLoginLogo.png');

export default function SplashView () {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Image style={{ width: 300, height: 100 }} source={ logo } />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Spinner />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />

    </View>
  );
}