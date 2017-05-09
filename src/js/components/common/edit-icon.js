/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import { withNavigation } from '@exponent/ex-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../../../styles/colours';

// @withNavigation
export default class EditIcon extends Component {
  render () {
    return (
      <Icon
        name="edit"
        style={{ paddingLeft: 15, paddingRight: 15 }}
        size={ 24 }
        color={ colours.gray }
      />
    );
  }
}
