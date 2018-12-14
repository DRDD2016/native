import React, { Component } from 'react';
import { Animated } from 'react-native';
import colours from '../../../styles/colours';
import { barScale } from '../../../styles/scaling';

const barstyle = {

  borderBottomLeftRadius: 0,
  borderTopLeftRadius: 0,
  borderBottomRightRadius: 15,
  borderTopRightRadius: 15,
  height: barScale(12),
  elevation: 1,
  shadowColor: colours.shadowColour,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2
};

export default class GrowingView extends Component {

  constructor (props) {
    super(props);

    this._barWidth = new Animated.Value(0);

  }

  componentDidMount () {

    const { barWidth } = this.props;
    console.log('GrowView DidMount barWidth', barWidth);

    Animated.timing(this._barWidth, {
      toValue: barWidth,
      duration: 1000
    }).start();

  }

  render () {
    const { barColor, barWidth } = this.props;
    console.log('GrowingView render', barWidth);

    return (

      <Animated.View
        style={[barstyle,
        { backgroundColor: barColor, width: this._barWidth }

      ]} />

    );
  }
}
