/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Client } from 'bugsnag-react-native';
import { NetInfo, AsyncStorage } from 'react-native';
// import {
//   setCustomView,
//   setCustomTextInput,
//   setCustomText
// } from 'react-native-global-props';
import Fabric from 'react-native-fabric';
import crashlytics from 'react-native-fabric-crashlytics';
import branch from 'react-native-branch';
import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/es/integration/react';
import { store } from './init-store';
import { setIsConnected, subscribeToBranch, linkDatafromBranch, saveIncomingLink, saveIncomingLinkError } from './actions/network';
import SplashView from './components/common/SplashView';
import AppWithNavigationState from './routes';
// import { AlertProvider } from './components/Alert';
import PushController from './lib/PushController';
import SpinnerContainer from './containers/common/SpinnerContainer';
// import colours from '../styles/colours';

const bugsnag = new Client();
// bugsnag.leaveBreadcrumb('index.js starting', {
//                   type: 'user'
//                 });
console.log(bugsnag);

crashlytics.init();

const { Answers } = Fabric;

// const customViewProps = {
//   style: {
//     // backgroundColor: colours.white
//   }
// };
//
// const customTextProps = {
//   style: {
//     fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
//     color: colours.darkgray
//   }
// };
//
// const customTextInputProps = {
//   underlineColorAndroid: 'rgba(0,0,0,0)',
//   style: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     backgroundColor: colours.offWhite
//   }
// };
//
//
// setCustomText(customTextProps);
// setCustomView(customViewProps);
// setCustomTextInput(customTextInputProps);

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
      NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
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

        console.info('Branch initialised');

        console.log('Branch params: ', JSON.stringify(params));


        if (error) {
          // there was an error. this is a String
          console.info('Error from Branch: ', error);
          linkData = 'none';
          store.dispatch(saveIncomingLinkError(error));
          store.dispatch(linkDatafromBranch());
          Answers.logCustom(`Index.js CompDidMount error from Branch: ${error}`, { additionalData: 'nothing' });
          return;
        }

        // params will never be null if error is null

        if (params['+non_branch_link']) {
          const nonBranchUrl = params['+non_branch_link'];
          console.log('nonBranchUrl', nonBranchUrl);
          Answers.logCustom(`Index.js CompDidMount non_branch_link: ${params}`, { additionalData: 'nothing' });

          linkData = 'none'; // replace with last string code

          store.dispatch(saveIncomingLink(linkData));
          store.dispatch(linkDatafromBranch());
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
          Answers.logCustom('Index.js CompDidMount clicked_branch_link params: none', { additionalData: 'nothing' });

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
          Answers.logCustom(`Index.js CompDidMount branch eventCode: ${params}`, { additionalData: 'nothing' });

          // store.dispatch(linkDatafromBranch()); // dont do this until loading finished on Feed
          // return linkData;

        } else {
          linkData = 'none';

          //
          console.log('saving linkData', linkData);
          //

          store.dispatch(saveIncomingLink(linkData));
          store.dispatch(linkDatafromBranch());
          Answers.logCustom('Index.js CompDidMount branch else linkcode none', { additionalData: 'nothing' });

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

    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    Answers.logCustom('Index.js UnMounted', { additionalData: 'nothing' });
  }

  _handleConnectionChange = (isConnected) => {
    console.log('isConnected changed to: ', isConnected);
    store.dispatch(setIsConnected(isConnected));
  };

  render () {
    console.log('render index', this.state);
    if (!this.state) return <SplashView />;
    if (!this.state.rehydrated) return <SplashView />;
    console.log('statecheckdone');

    return (
      <Provider store={ store }>


        <PushController>
          <SpinnerContainer>
            <AppWithNavigationState />
          </SpinnerContainer>
        </PushController>


      </Provider>
    );
  }
}

export default App;
