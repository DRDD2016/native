/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import ButtonHeader from '../common/ButtonHeader';
import discardEvent from '../../lib/discard-event';
import BackIcon from '../common/back-icon';

export default class BackButton extends Component {

  render () {
    const { stack, nav } = this.props;

    return (
      <ButtonHeader onPress={() => discardEvent(stack, nav)} >
        <BackIcon />
      </ButtonHeader>
    );
  }
}
