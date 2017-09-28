import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import colours from '../../../styles/colours';

export default function ButtonHeader ({ onPress, children, testDescription }) {

  return (
    <TouchableOpacity
      onPress={onPress} style={{ margin: 15, justifyContent: 'center' }}
      accessibilityLabel={testDescription}
    >
      <Text style={{ color: colours.gray, fontWeight: '600' }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
