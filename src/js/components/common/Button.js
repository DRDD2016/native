import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function Button ({ onPress, children, buttonStyle, textStyle, testDescription }) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      accessibilityLabel={testDescription}
    >
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
