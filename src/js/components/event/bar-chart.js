import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { barScale, feedHorizPaddingScale, moderateScale } from '../../../styles/scaling';
import GrowingView from './grow-view';

export default class BarChart extends Component {

  constructor (props) {
    super(props);
    const allData = this.props.allData;
    const tallyData = this.props.tally;
    const maxTally = Math.max(...allData);
    const width = this.getWidth(tallyData, maxTally);

    this.state = {
      barWidth: width
    };
  }

  /**
   * Calculate width of each bar
  */

  componentDidMount () {
    console.log('bar Chart Did Mount');
  }


  shouldComponentUpdate (nextProps) {

    console.log('should?', this.props.tally === nextProps.tally);
    if (this.props.tally === nextProps.tally) {

      return false;
    }
      return true;


  }

  getWidth (data, maxTally) {
    const deviceWidth = Dimensions.get('window').width;

    const maximumWidth = () => {
      if (maxTally === 1) {
        return (deviceWidth - feedHorizPaddingScale(20) - moderateScale(5) - 1) / 2 / 3;
      }
      if (maxTally === 2) {
        return (deviceWidth - feedHorizPaddingScale(20) - moderateScale(5) - 1) / 2 / (3 * 2);
      }
      return (deviceWidth - feedHorizPaddingScale(20) - moderateScale(5) - 1) / 2;
    };

    const maxWidth = maximumWidth();
    const multFactor = maxWidth / maxTally;

    let width = {};

    if (data === 0) {
      width = 0.1;
    } else {
      width = data * multFactor;
    }

    return width;
  }


  render () {
    const { barWidth } = this.state;
    const { chartColor, tally, previousTally } = this.props;

    // console.log('barWidth', barWidth);

    return (
      <View
        style={{
          flexDirection: 'column', height: barScale(16) }}
      >
        <View
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%'
            }}
          >
            {barWidth &&
              <GrowingView barColor={chartColor} barWidth={barWidth} tally={tally} previousTally={previousTally} />
            }
          </View>
        </View>
      </View>
    );
  }
}
