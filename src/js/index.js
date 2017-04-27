/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { NetInfo, AsyncStorage } from 'react-native';
import {
  NavigationProvider,
  StackNavigation
} from '@exponent/ex-navigation';
import Fabric from 'react-native-fabric';
import { persistStore } from 'redux-persist';
import { store } from './init-store';
import { setIsConnected } from './actions/network';
import Spinner from './components/common/Spinner';
import Router from './router';
import navigationContext from './custom-navigation-context';

const { Answers } = Fabric;

// disable remote debugger warning in a simulator
console.disableYellowBox = true;

console.log((require('react-native-config').default));

class App extends Component {

  componentWillMount () {
    persistStore(store,
      {
        storage: AsyncStorage,
        whitelist: ['user'],
        debounce: 2000
      },
      () => {
        this.setState({ rehydrated: true });
      });
  }

  componentDidMount () {
    NetInfo.isConnected.fetch().then().done(() => {
      NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
    });
    Answers.logCustom('Index.js Mounted', { additionalData: 'nothing' });
  }

  componentWillUnmount () {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    store.dispatch(setIsConnected(isConnected));
  };

  render () {
    if (!this.state) return <Spinner />;
    if (!this.state.rehydrated) return <Spinner />;
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
