import React, { Component } from 'react';
import { Image, View, AsyncStorage } from 'react-native';
import Router from '../../router';

const logo = require('../../../img/sparkLoginLogo.png');

export default class Splash extends Component {

  componentWillMount () {
    setTimeout(() => {
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          this.props.navigator.push(Router.getRoute('navbar'));
        } else {
          this.props.navigator.push(Router.getRoute('auth'));
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
