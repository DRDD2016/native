
jest.mock('NetInfo', () => {
  return {
    isConnected: {
      fetch: () => {
        return new Promise((accept, resolve) => { //eslint-disable-line
          accept(true);
        });
      },
      addEventListener: jest.fn()
    }
  };
});

jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn()
  };
});

jest.mock('react-native-fcm', () => {
  return {
    on: jest.fn(),
    requestPermissions: jest.fn(),
    getFCMToken: jest.fn(() => new Promise((accept, resolve) => accept('FakeToken'))),
    getAPNSToken: jest.fn(() => new Promise((accept, resolve) => accept('FakeToken'))),
    FCMEvent: {
      Notification: 'fakeNotification'
    }
  };
});

// jest.mock('react-native', () => ({
//     Dimensions: {
//       get: jest.fn()
//     },
//     NativeModules: {
//       BugsnagReactNative: null
//     }
// }), {
//     virtual: true
// });

jest.mock('react-native-vector-icons/FontAwesome', () => {
  return {

  };
});

jest.mock('bugsnag-react-native', () => {
  return {
    Client: jest.fn(),
    leaveBreadcrumb: 'stuff'

  };
});

// jest.mock('../src/js/index.js', () => {
//     return {
//       bugsnag: {
//         leaveBreadcrumb: 'stuff'
//       }
//     };
// });


jest.mock('react-native-vector-icons/FontAwesome', () => {
  return {

  };
});
