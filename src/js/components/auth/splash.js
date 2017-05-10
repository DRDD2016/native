import React, { Component } from 'react';
import { Image, View, AsyncStorage } from 'react-native';
import initSocket from '../../socket-router';

const logo = require('../../../img/sparkLoginLogo.png');

export default class Splash extends Component {

  static navigationOptions = {
    title: 'Splash',
    header: null
  }

  componentWillMount () {
    setTimeout(() => {
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          initSocket();
          this.props.navigation.navigate('tabsMain');
        } else {
          this.props.navigation.navigate('auth');
        }
      });
    }, 2000);
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.2 }}>
          <Image style={{ height: 100, width: 300 }} source={ logo } />
        </View>
      </View>
    );
  }
}
