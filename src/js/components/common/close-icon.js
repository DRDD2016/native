/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../../../styles/colours';

export default class CloseIcon extends Component {

  render () {

    return (
      <Icon
        name="close"
        style={{ paddingLeft: 15, paddingRight: 15 }}
        size={ 24 }
        color={ colours.gray }
      />
    );
  }
}
