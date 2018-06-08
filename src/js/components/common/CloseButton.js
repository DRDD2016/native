/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import ButtonHeader from '../common/ButtonHeader';
import discardEvent from '../../lib/discard-event';
import CloseIcon from '../common/close-icon';

export default class CloseButton extends Component {

  render () {
    const { stack, nav } = this.props;

    return (
      <ButtonHeader onPress={() => discardEvent(stack, nav)} >
        <CloseIcon />
      </ButtonHeader>
    );
  }
}
