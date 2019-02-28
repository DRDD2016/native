import React, { Component } from 'react';
import { Animated } from 'react-native';
import colours from '../../../styles/colours';

const barstyle = {

  borderBottomLeftRadius: 0,
  borderTopLeftRadius: 0,
  borderBottomRightRadius: 15,
  borderTopRightRadius: 15,
  height: '100%',
  elevation: 1,
  shadowColor: colours.shadowColour,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2
};

export default class GrowingView extends Component {

  constructor (props) {
    super(props);
    const tallyData = this.props.tally;
    const previousTallyData = this.props.previousTally;
    const barWidth = this.props.barWidth;
    const startValue = (tallyData === previousTallyData) ? barWidth : 0;
    console.log('constructor tallyData', tallyData);
    console.log('constructor previousTallyData', previousTallyData);
    console.log('constructor start value', startValue);

    this._barWidth = new Animated.Value(startValue);

  }

  componentDidMount () {

    const { barWidth } = this.props;
    console.log('GrowView DidMount barWidth', barWidth);

    Animated.timing(this._barWidth, {
      toValue: barWidth,
      duration: 2000
    }).start();

  }

  // shouldComponentUpdate (nextProps) {
  //
  //   console.log('should?', this.props.barWidth === nextProps.barWidth);
  //   if (this.props.barWidth === nextProps.barWidth) {
  //
  //     return false;
  //   }
  //     return true;
  //
  //
  // }

  render () {
    const { barColor } = this.props;
    // console.log('GrowingView render', barWidth);


      return (

        <Animated.View
          style={[barstyle,
          { backgroundColor: barColor, width: this._barWidth }

        ]} />

      );


  }
}
