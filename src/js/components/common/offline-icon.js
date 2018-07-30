/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../../../styles/colours';

export default class OfflineIcon extends Component {

  render () {

    return (
      <Icon
        name="wifi"
        style={{ textDecorationLine: 'line-through', paddingLeft: 15, paddingRight: 15 }}
        size={ 20 }
        color={ colours.gray }
      />
    );
  }
}
