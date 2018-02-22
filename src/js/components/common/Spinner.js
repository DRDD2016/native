import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const styles = {
  spinnerStyle: {
    flex: 1,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default function Spinner ({ size }) {

  return (
    <View style={[styles.spinnerStyle, { borderWidth: 1, borderColor: 'red' }]}>
      <ActivityIndicator animating style={{ opacity: 1 }} size={size || 'large'} />
    </View>
  );
}
