import React, { Component } from 'react';
import { Image, View, AsyncStorage } from 'react-native';
import initSocket from '../../socket-router';
import { subscribeToBranchLinks } from '../../lib/branchLink';

const logo = require('../../../img/sparkLoginLogo.png');

export default class Splash extends Component {

  static navigationOptions = {
    title: 'Splash',
    header: null
  }

  componentWillMount () {

    console.log('SplashProps', this.props);

    setTimeout(() => {
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          console.log('socket init');
          initSocket();
          console.log('socket inited');

          subscribeToBranchLinks(this.props.navigation);

          // if branch link rec'd go to event, else go to tabsMain/Feed.
          // Then do same on Feed.


          this.props.navigation.navigate('tabsMain');
        } else {
          this.props.navigation.navigate('auth');
        }
      });
    }, 1000);
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
