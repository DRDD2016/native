import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  NavigationContext,
  NavigationProvider,
  StackNavigation
} from '@exponent/ex-navigation';
import { store } from './init-store';
import Router from './router';

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
          <StackNavigation initialRoute={ Router.getRoute('auth') } />
        </NavigationProvider>
      </Provider>
    );
  }
}

export default App;
