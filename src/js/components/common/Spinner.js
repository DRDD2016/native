import React from 'react';
import { View, ActivityIndicator } from 'react-native';
// import { moderateScale } from '../../../styles/scaling';
import colours from '../../../styles/colours';

const styles = {
  spinnerStyle: {
    flex: 1,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default function Spinner ({ size }) {
  console.log('size', size);
  const newSize = 'large';
  // const scaledSize = moderateScale(newSize);
  const color = colours.main;

  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator animating style={{ opacity: 1 }} size={newSize || 'large'} color={color} />
    </View>
  );
}
