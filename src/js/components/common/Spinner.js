import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default function Spinner ({ size }) {
  return (
    <View style={[styles.spinnerStyle, { borderWidth: 1, borderColor: 'red' }]}>
      <ActivityIndicator animating size={size || 'large'} />
    </View>
  );
}
