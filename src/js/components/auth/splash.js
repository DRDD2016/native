import React, { Component } from 'react';
import { Image, View, AsyncStorage } from 'react-native';
import Fabric from 'react-native-fabric';
import { NavigationActions } from 'react-navigation';
import initSocket from '../../socket-router';
import Spinner from '../common/Spinner';
import { store } from '../../init-store';

const { Answers } = Fabric;

const logo = require('../../../img/sparkLoginLogo.png');

export default class Splash extends Component {

  static navigationOptions = {
    title: 'Splash',
    header: null
  }

  componentWillMount () {

    console.log('SplashWillMount', this.props);

    setTimeout(() => {
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          // console.log('socket init');
          initSocket();

          // start isFetching here

          console.log('this.props', this.props);
          console.log('this.props.isFetchingBranch', this.props.isFetchingBranch);


          const splashStore = store.getState();
          console.log('splashStore: ', splashStore);
          // could add container to bring this prop in.


          if (splashStore.network.inComingLinkCode !== undefined) {

            if (splashStore.network.inComingLinkCode === 'none') {
              console.log('navigating to Feed because inComingLinkCode === none');

              const resetAction = NavigationActions.reset({
                index: 0,
                key: null,
                actions: [
                  NavigationActions.navigate({ routeName: 'tabsMain' })
                ]
              });

              this.props.navigation.dispatch(resetAction);

            } else {
              console.log('inComingLinkCode NOT none so navigating to Event');
              console.log('NOT routed, shouldnt be required');

            }

          } else {
            console.log('inComingLinkCode === undefined so navigating to Feed');

            const resetAction = NavigationActions.reset({
              index: 0,
              key: null,
              actions: [
                NavigationActions.navigate({ routeName: 'tabsMain' })
              ]
            });

            this.props.navigation.dispatch(resetAction);

          }

        } else {
          console.log('No Token, so navigating to login/signup-index');
          // if no token, go to login/signup
          this.props.navigation.navigate('auth');
        }
      });
    }, 1000);
  }

  componentDidMount () {
    Answers.logCustom('Splash.js Mounted', { additionalData: 'nothing' });
  }

  render () {
    console.log('splash render');
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
