/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../../../styles/colours';

export default class DeleteIcon extends Component {

  render () {
    return (
      <Icon
        name="trash"
        style={{ paddingLeft: 15, paddingRight: 15 }}
        size={ this.props.size || 24 }
        color={ this.props.color || colours.gray }
      />
    );
  }
}
