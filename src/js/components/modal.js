import React, { Component } from 'react';
import { Animated, Platform, View } from 'react-native';
import { NavigationStyles, StackNavigation } from '@exponent/ex-navigation';

export default class Modal extends Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideVertical,
      configureTransition: () => ({
        timing: Animated.spring,
        speed: 25,
        bounciness: 0,
        useNativeDriver: Platform.OS === 'android'
      }),
      gestures: null
    },
    navigationBar: {
      visible: false
    }
  };

  render () {
    return (
      <View style={{ flex: 1 }}>
        <StackNavigation
          initialRoute={this.props.route.params.initialRoute}
          defaultRouteConfig={{
            styles: (Platform.OS === 'android' ?
              NavigationStyles.Fade :
              NavigationStyles.SlideHorizontalIOS
            ),
            navigationBar: {
              visible: true
            }
          }}
        />
      </View>
    );
  }
}
