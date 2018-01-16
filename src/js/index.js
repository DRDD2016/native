/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { NetInfo, AsyncStorage } from 'react-native';
import Fabric from 'react-native-fabric';
import branch from 'react-native-branch';
import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/es/integration/react';
import { store } from './init-store';
import { setIsConnected, subscribeToBranch, linkDatafromBranch, saveIncomingLink, saveIncomingLinkError } from './actions/network';
import Spinner from './components/common/Spinner';
import AppWithNavigationState from './routes';
import { AlertProvider } from './components/Alert';
import PushController from './lib/PushController';

const { Answers } = Fabric;

console.log((require('react-native-config').default));
// disable remote debugger warning in a simulator
console.disableYellowBox = true;
console.ignoredYellowBox = [
  'Setting a timer'
];

let _unsubscribeFromBranch = null;

class App extends Component {

  constructor () {
    super();
    this.state = {
      rehydrated: false
    };

  }

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

    setTimeout(() => {
      // console.log('timeout');
      //
      // console.log('this.state: ', this.state);
      //
      // console.info('Subscribing to Branch links');

      _unsubscribeFromBranch = branch.subscribe(({ error, params }) => {

        store.dispatch(subscribeToBranch());
        // repeat this to set loading true when new link rec'd when app already open

        let linkData = 'none';

        console.info('Received link params from Branch');

        console.log('Branch params: ', JSON.stringify(params));


        if (error) {
          // there was an error. this is a String
          console.info('Error from Branch: ', error);
          linkData = 'none';
          store.dispatch(saveIncomingLinkError(error));
          store.dispatch(linkDatafromBranch());
          return;
        }

        // params will never be null if error is null

        if (params['+non_branch_link']) {
          const nonBranchUrl = params['+non_branch_link'];
          console.log('nonBranchUrl', nonBranchUrl);
          // Route non-Branch URL if appropriate.
          return;
        }

        if (!params['+clicked_branch_link']) {
          // Indicates initialization success and some other conditions.
          // No link was opened.

          //
          const lstore = store.getState();
          console.log('store: ', lstore);
          //

          linkData = 'none';
          console.log('No link opened, linkData: ', linkData);
          store.dispatch(saveIncomingLink(linkData));
          store.dispatch(linkDatafromBranch());

          //
          const lstore2 = store.getState();
          console.log('store2: ', lstore2);
          //

          return;
        }

        // A Branch link was opened.
        // Route link based on data in params.

        if (params.eventCode) {

          linkData = params.eventCode;

          //
          const lstore = store.getState();
          console.log('store: ', lstore);
          //

          store.dispatch(saveIncomingLink(linkData));
          // store.dispatch(linkDatafromBranch()); // dont do this until loading finished on Feed
          // return linkData;

        } else {
          linkData = 'none';

          //
          console.log('saving linkData', linkData);
          //

          store.dispatch(saveIncomingLink(linkData));
          store.dispatch(linkDatafromBranch());
          // return linkData;
        }

      });
    }, 2000);
    console.log('end: ');

  }

  componentWillUnmount () {

    if (_unsubscribeFromBranch) {
      _unsubscribeFromBranch();
      _unsubscribeFromBranch = null;
    }

    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    console.log('isConnected changed to: ', isConnected);
    store.dispatch(setIsConnected(isConnected));
  };

  render () {
    console.log('render index', this.state);
    if (!this.state) return <Spinner />;
    if (!this.state.rehydrated) return <Spinner />;
    console.log('statecheckdone');

    return (
      <Provider store={ store }>

        <AlertProvider>
          <PushController>
            <AppWithNavigationState />
          </PushController>
        </AlertProvider>

      </Provider>
    );
  }
}

export default App;
