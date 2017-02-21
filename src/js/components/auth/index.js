import React, { Component } from 'react';
import { Image, Text, View, AsyncStorage } from 'react-native';
import Button from '../common/Button';
import Router from '../../router';
import colours from '../../../styles/colours';

const logo = require('../../../img/sparkLoginLogo.png');

export default class Index extends Component {

  componentWillMount () {
    AsyncStorage.getItem('spark_token')
    .then((token) => {
      if (token) {
        this.props.navigator.push(Router.getRoute('navbar'));
      }
    });
  }

  goToLogin = () => {
    this.props.navigator.push(Router.getRoute('login'));
  }

  goToSignup = () => {
    this.props.navigator.push(Router.getRoute('signup'));
  }

  render () {
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
            buttonStyle={{ flex: 1, height: 50, backgroundColor: colours.blue, justifyContent: 'center' }}
            textStyle={{ alignSelf: 'center', color: '#fff', fontWeight: '300', fontSize: 20 }}
            onPress={ this.goToLogin }
          >
            LOG IN
          </Button>
          <Button
            buttonStyle={{ flex: 1, height: 50, backgroundColor: colours.orange, justifyContent: 'center' }}
            textStyle={{ alignSelf: 'center', color: '#fff', fontWeight: '300', fontSize: 20 }}
            onPress={ this.goToSignup }
          >
            SIGN UP
          </Button>
        </View>
      </View>
    );
  }
}
