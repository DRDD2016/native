import React from 'react';
import { Image, Text, View } from 'react-native';
import Button from '../common/Button';
import Router from '../../router';
import styles from '../../../styles';

export default function Index ({ navigator }) {

  const goToLogin = () => {
    navigator.push(Router.getRoute('login'));
  };

  const goToSignup = () => {
    navigator.push(Router.getRoute('signup'));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={ styles.row }>
        <Image style={ styles.logo } source={ require('../../../img/sparkLoginLogo.png') } />
      </View>
      <View style={ styles.row }>
        <Text style={ styles.textSnippet }>
          The easy way to organise parties, events,
          share pictures and memories with friends, family and groups.
        </Text>
      </View>
      <Button
        buttonStyle={ styles.buttonStyle }
        textStyle={ styles.buttonTextStyle }
        onPress={ goToLogin }
      >
        Login
      </Button>
      <Button
        buttonStyle={ styles.buttonStyle }
        textStyle={ styles.buttonTextStyle }
        onPress={ goToSignup }
      >
        Sign up
      </Button>
    </View>
  );
}
