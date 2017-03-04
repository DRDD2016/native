import React, { Component } from 'react';
import { Image, View, AsyncStorage, NetInfo, Text } from 'react-native';
import Router from '../../router';
import initSocket from '../../socket-router';

const logo = require('../../../img/sparkLoginLogo.png');

export default class Splash extends Component {
  constructor () {
    super();
    this.state = {
      isConnected: false
    };
  }

  componentWillMount () {
    setTimeout(() => {
      if (this.state.isConnected) {
        AsyncStorage.getItem('spark_token')
        .then((token) => {
          if (token) {
            initSocket();
            this.props.navigator.push(Router.getRoute('navbar'));
          } else {
            this.props.navigator.push(Router.getRoute('auth'));
          }
        });
      } else {
        this.props.navigator.showLocalAlert('You are not connected to Internet!', {
          text: { color: '#fff' },
          container: { backgroundColor: 'red' }
        });
      }
    }, 2000);
  }

  componentDidMount () {
    NetInfo.isConnected.addEventListener(
      'change',
      this._handleConnectivityChange
    );
  }

  // componentWillUnmount () {
  //   NetInfo.isConnected.removeEventListener(
  //     'change',
  //     this._handleConnectivityChange
  //   );
  // }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected
    });
  };

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.2 }}>
          <Image style={{ height: 100, width: 300 }} source={ logo } />
          <Text>{this.state.isConnected ? 'Online' : 'Offline'}</Text>
        </View>
      </View>
    );
  }
}
