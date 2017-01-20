import React from 'react';
import { Image, Text, View } from 'react-native';
import Button from '../common/Button';
import Router from '../../router';

const logo = require('../../../img/sparkLoginLogo.png');

export default function Index ({ navigator }) {

  const goToLogin = () => {
    navigator.push(Router.getRoute('login'));
  };

  const goToSignup = () => {
    navigator.push(Router.getRoute('navbar'));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.2 }}>
        <Image style={{ height: 100, width: 300 }} source={ logo } />
      </View>
      <View style={{ flex: 0.3 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#a39b9b' }}>
          The easy way to organise parties, events,
          share pictures and memories with friends, family and groups.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
        <Button
          buttonStyle={{ flex: 1, height: 50, backgroundColor: '#1984f0', justifyContent: 'center' }}
          textStyle={{ alignSelf: 'center', color: '#fff', fontWeight: '300', fontSize: 20 }}
          onPress={ goToLogin }
        >
          LOG IN
        </Button>
        <Button
          buttonStyle={{ flex: 1, height: 50, backgroundColor: '#ee7433', justifyContent: 'center' }}
          textStyle={{ alignSelf: 'center', color: '#fff', fontWeight: '300', fontSize: 20 }}
          onPress={ goToSignup }
        >
          SIGN UP
        </Button>
      </View>
    </View>
  );
}
