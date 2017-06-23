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

it('renders correctly', () => {
  renderer.create(
    <Index />
  );
});
