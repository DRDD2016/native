import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
// import styles from '../../../styles';
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


  getWidth (data, maxTally) {
    const deviceWidth = Dimensions.get('window').width;
    const maxWidth = deviceWidth / 4;
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
    const { chartColor } = this.props;

    console.log('barWidth', barWidth);

    return (
      <View
        style={{
          flexDirection: 'column',
          marginTop: 1,
          marginBottom: 1 }}
      >
        <View
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center' }}
          >
            {barWidth &&
              <GrowingView barColor={chartColor} barWidth={barWidth} />
            }
          </View>
        </View>
      </View>
    );
  }
}
