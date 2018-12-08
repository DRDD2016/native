import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const Arrow = ({ size, color, tailLength }) => {
  const arrowWidth = size / 3.5;
  const styles = StyleSheet.create({
    masterContainer: {
      borderColor: 'green',
      borderWidth: 1,
      flex: 1,
      flexDirection: 'column'
    },
    container: {
      backgroundColor: 'transparent',
      // overflow: 'visible',
      marginTop: size * 0.4,
      width: tailLength,
      height: size * 1.6,
      alignItems: 'flex-start',
      borderColor: 'red',
      borderWidth: 1,
      paddingRight: size * 0.4,
      transform: [{ rotate: '0deg' }]
    },
    arrowTail: {
      backgroundColor: color,
      width: '100%',
      height: arrowWidth,
      left: size * 0.4,
      borderTopColor: 'transparent',
      borderStyle: 'solid',
      position: 'absolute',
      top: size * 0.65
    },
    arrowHead2: {
      backgroundColor: color,
      width: size,
      height: arrowWidth,
      borderTopColor: 'transparent',
      borderStyle: 'solid',
      transform: [{ rotate: '45deg' }],
      position: 'absolute',
      top: size * 0.9
    },
    arrowHead1: {
      backgroundColor: color,
      width: size,
      height: arrowWidth,
      borderTopColor: 'transparent',
      borderStyle: 'solid',
      transform: [{ rotate: '135deg' }],
      position: 'absolute',
      top: size * 0.4
    }
  });


  return (
    <View style={styles.masterContainer}>
      <View style={styles.container}>
        <View style={styles.arrowHead1} />
        <View style={styles.arrowHead2} />
        <View style={styles.arrowTail} />
      </View>
    </View>
  );
};

Arrow.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

Arrow.defaultProps = {
  size: 15,
  color: 'black'
};
export default Arrow;
