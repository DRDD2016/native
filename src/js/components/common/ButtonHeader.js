import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Header } from 'react-navigation';
import colours from '../../../styles/colours';

export default function ButtonHeader ({ onPress, children, testDescription }) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: Header.HEIGHT,
        height: Header.HEIGHT
      }}
      accessibilityLabel={testDescription}
    >
      <Text style={{ color: colours.headerButtonColor, fontWeight: '600' }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
