import React, { Component } from 'react';
import { Animated } from 'react-native';
import styles from '../../../styles';

export default class GrowingView extends Component {

  constructor (props) {
    super(props);

    this._barWidth = new Animated.Value(0);

  }

  componentDidMount () {

    const { barWidth } = this.props;
    console.log('barWidth', barWidth);

    Animated.timing(this._barWidth, {
      toValue: barWidth,
      duration: 1000
    }).start();

  }

  render () {
    const { barColor } = this.props;


    return (

      <Animated.View
        style={[styles.bar,
        { backgroundColor: barColor, width: this._barWidth }

      ]} />

    );
  }
}
