import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Index from '../src/js/';

// Note: test renderer must be required after react-native.

jest.mock('react-native-fabric', () => {
  return {
    Crashlytics: {
      crash: () => {}
    },
    Answers: {
      logCustom: () => {},
      logContentView: () => {}
    }
  };
});

jest.mock('react-native-branch', () => {
  return {
    AddToCartEvent: 'Add To Cart',
    subscribe: (cb) => { cb({ params: {}, error: null }); }

    // and for createBranchUniversalObject, etc.
  };
});

// jest.mock('react-native', () => ({
//     NativeModules: {
//       BugsnagReactNative: null
//     }
// }), {
//     virtual: true
// });

jest.mock('bugsnag-react-native', () => {
  return {
    Client: jest.fn()
  };
});

// jest.mock('../src/js/index.js', () => {
//     return {
//       bugsnag: {
//         leaveBreadcrumb: 'stuff'
//       }
//     };
// });


jest.mock('react-native-fcm', () => {
  return {
    on: jest.fn(),
    requestPermissions: jest.fn(),
    getFCMToken: jest.fn(() => new Promise(accept => accept('FakeToken'))),
    getAPNSToken: jest.fn(() => new Promise(accept => accept('FakeToken'))),
    FCMEvent: {
      Notification: 'fakeNotification'
    }
  };
});

jest.mock('react-native-dropdownalert', () => {
  return {

  };
});

jest.mock('react-native-vector-icons/FontAwesome', () => {
  return {

  };
});

it('renders correctly', () => {
  renderer.create(
    <Index />
  );
});
