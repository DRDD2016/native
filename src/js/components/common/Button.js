import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function Button ({ onPress, children, buttonStyle, textStyle }) {
  console.log(children);
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
