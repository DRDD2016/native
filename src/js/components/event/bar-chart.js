import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import styles from '../../../styles';

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

  ComponentDidMount () {
    this.handleAnimation();
  }

  handleAnimation () {
    const width = this.getWidth(this.props.tallyData);
    const timing = Animated.timing;

    const indicators = ['poll1'];
    Animated.parallel(indicators.map((item) => {
      return timing(this.state[item], { toValue: width[item] });
    })).start();
  }

  render () {
    const { barWidth } = this.state;

    return (
      <View style={styles.barContainer}>
        <View style={styles.barItem}>
          <View style={styles.barData}>
            {barWidth &&
              <Animated.View style={[styles.bar, { backgroundColor: this.props.chartColor }, { width: barWidth }]} />
            }
          </View>
        </View>
      </View>
    );
  }
}
