/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { NetInfo } from 'react-native';
import {
  NavigationProvider,
  StackNavigation
} from '@exponent/ex-navigation';
// import Fabric from 'react-native-fabric';
import { store } from './init-store';
import { setIsConnected } from './actions/network';
import Router from './router';
import navigationContext from './custom-navigation-context';

// const { Crashlytics, Answers } = Fabric;

// disable remote debugger warning in a simulator
console.disableYellowBox = true;

console.log((require('react-native-config').default));

class App extends Component {

  componentDidMount () {
    NetInfo.isConnected.fetch().then().done(() => {
      NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
    });
  }

  componentWillUnmount () {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    store.dispatch(setIsConnected(isConnected));
  };

  render () {
    return (
      <Provider store={ store }>
        <NavigationProvider context={ navigationContext }>
          <StackNavigation id="root" navigatorUID="root" initialRoute={ Router.getRoute('splash') } />
        </NavigationProvider>
      </Provider>
    );
  }
}

export default App;
