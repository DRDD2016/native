import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Fabric from 'react-native-fabric';
import { StackActions, NavigationActions } from 'react-navigation';
import initSocket from '../../socket-router';
import SplashView from '../common/SplashView';
import { getUserNoById } from '../../actions/profile';
import { store } from '../../init-store';

const { Answers } = Fabric;


export default class Splash extends Component {

  static navigationOptions = {
    title: 'Splash',
    header: null
  }

  componentWillMount () {

    console.log('SplashWillMount: ');
    // console.log('SplashWillMount: ', this.props);

    setTimeout(() => {
      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {

          initSocket();

          AsyncStorage.getItem('spark_user_id')
          .then((user_id) => {
            if (token && user_id) {

              console.log('getting_user_nos');

              store.dispatch(getUserNoById(token, user_id));
              // and dispatch action to get user updateNo and Open No for user
            }
          });

          // console.log('splash this.props', this.props);
          console.log('this.props.isFetchingBranch', this.props.isFetchingBranch);


          const splashStore = store.getState();
          // console.log('splashStore: ', splashStore);
          // could add container to bring this prop in.


          if (splashStore.network.inComingLinkCode !== undefined) {

            if (splashStore.network.inComingLinkCode === 'none') {
              console.log('navigating to Feed because inComingLinkCode === none');

              const resetAction = StackActions.reset({
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

            const resetAction = StackActions.reset({
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
    console.log('SplashDidMount: ');
    // console.log('SplashDidMount: ', this.props);
  }

  componentWillReceiveProps () {
    console.log('splash will rec props:');
    // console.log('splash this props:', this.props);
    // console.log('splash next props:', nextProps);
  }

  render () {
    console.log('splash render');


    return (

      <SplashView />

    );
  }
}
