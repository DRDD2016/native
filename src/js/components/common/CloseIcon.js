/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withNavigation } from '@exponent/ex-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../../../styles/colours';

@withNavigation
export default class CloseButton extends Component {
  render () {
    return (
      <Icon
        name="chevron-left"
        style={{ padding: 5 }}
        size={ 24 }
        color={ colours.white }
        onPress={() => this.props.navigation.dismissModal()}
      />
    );
  }
}
