/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Animated } from 'react-native';
import colours from '../../../styles/colours';


export default class DropdownView extends Component {

  render () {
    const { children, navbarHeight, navbarOpacity, navbarTranslate } = this.props;

    return (
      <Animated.View
        style={[{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          // flex: 1,
          zIndex: 1,
          height: navbarHeight,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colours.filterPanelBackgroundColor,
          borderBottomWidth: 1,
          borderBottomColor: colours.lightgray,
          opacity: navbarOpacity,
          shadowOpacity: 0.8,
          shadowRadius: 1,
          shadowColor: colours.gray,
          shadowOffset: { height: 1, width: 0 }
        },
        { transform: [{ translateY: navbarTranslate }] }]}
      >

        {children}

      </Animated.View>
    );
  }

}
