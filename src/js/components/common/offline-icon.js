/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../../../styles/colours';

export default class OfflineIcon extends Component {

  render () {

    return (
      <Icon
        name="wifi"
        style={{ textDecorationColor: colours.headerButtonColor, textDecorationLine: 'line-through', paddingLeft: 5, paddingRight: 5 }}
        size={ 20 }
        color={ colours.headerButtonColor }
      />
    );
  }
}
