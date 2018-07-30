/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import colours from '../../../styles/colours';

export default class OfflineIcon extends Component {

  render () {

    return (
      <Icon
        name="cloud-off" // Feather
        style={{ paddingLeft: 5, paddingRight: 5 }}
        size={ 20 }
        color={ colours.headerButtonColor }
      />
    );
  }
}

// name="signal" // entypo
// style={{ textDecorationColor: colours.headerButtonColor, textDecorationLine: 'line-through', paddingLeft: 5, paddingRight: 5 }}
