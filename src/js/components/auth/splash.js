import React, { Component } from 'react';
import { Image, View, AsyncStorage } from 'react-native';
import initSocket from '../../socket-router';
import Spinner from '../common/Spinner';
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

          subscribeToBranchLinks(this.props.navigation);

          // start isFetching here
          console.log('navigating to Feed');
          this.props.navigation.navigate('tabsMain');

        } else {
          // if no token, go to login/signup
          this.props.navigation.navigate('auth');
        }
      });
    }, 1000);
  }

  componentWillUpdate (nextProps) {

    console.log('SplashWillUpdateProps', this.props);
    console.log('SplashWillUpdateNextProps', nextProps);

    if (nextProps.inComingLinkCode === 'none') {
      console.log('no Code');

      console.log('navigating to Feed');
      this.props.navigation.navigate('tabsMain');

    } else {
      // Code so just wait until SubmitCode action completes, will go to Event.
      console.log('Code so no Nav yet, waiting for Submit Code to finish');
    }

  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.2 }}>
          <Image style={{ height: 100, width: 300 }} source={ logo } />
          {
            this.props.isFetching && <Spinner />
          }
        </View>

      </View>
    );
  }
}
