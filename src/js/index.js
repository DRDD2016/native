/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  NavigationContext,
  NavigationProvider,
  StackNavigation
} from '@exponent/ex-navigation';
import { store } from './init-store';
import Router from './router';
import socket from './socket-router'; // eslint-disable-line no-unused-vars

// disable remote debugger warning in a simulator
console.disableYellowBox = true;

const navigationContext = new NavigationContext({
  router: Router,
  store
});

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <NavigationProvider context={ navigationContext }>
          <StackNavigation id="root" navigatorUID="root" initialRoute={ Router.getRoute('navbar') } />
        </NavigationProvider>
      </Provider>
    );
  }
}

export default App;
