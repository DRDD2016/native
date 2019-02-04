/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../../../styles/colours';
import { moderateScale } from '../../../styles/scaling';

export default class BurgerIcon extends Component {

  render () {

    return (
      <Icon
        name="bars"
        style={{
          // borderColor: 'green', borderWidth: 1
        }}
        size={ moderateScale(24) }
        color={ colours.main }
      />
    );
  }
}

// ellipsis-v is othe burger icon
