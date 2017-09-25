/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { NetInfo, AsyncStorage } from 'react-native';
import Fabric from 'react-native-fabric';
import { persistStore } from 'redux-persist';
import { store } from './init-store';
import { setIsConnected } from './actions/network';
import Spinner from './components/common/Spinner';
import { StackRoot } from './routes';
import { AlertProvider } from './components/Alert';
import PushController from './lib/PushController';

const { Answers } = Fabric;

console.log((require('react-native-config').default));
// disable remote debugger warning in a simulator
console.disableYellowBox = true;
console.ignoredYellowBox = [
  'Setting a timer'
];

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
        <AlertProvider>
          <PushController>
            <StackRoot />
          </PushController>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
