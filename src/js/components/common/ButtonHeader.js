import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Header } from 'react-navigation';
import colours from '../../../styles/colours';
import { iconScale } from '../../../styles/scaling';

console.log('Header Button height: ', Header.HEIGHT);

export default function ButtonHeader ({ onPress, children, testDescription }) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: iconScale(15)
      }}
      accessibilityLabel={testDescription}
    >
      <Text style={{ color: colours.headerButtonColor }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
