import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
/* eslint-disable camelcase */

export default function ContactRow (props) {
  const { firstname, surname, phone_number, isSelected } = props.data;

  return (
    <View style={{ backgroundColor: isSelected ? 'green' : 'aliceblue' }}>
      <TouchableOpacity
        onPress={ props.onPress }
      >
        <Text>{firstname} {surname} {phone_number}</Text>
      </TouchableOpacity>
    </View>
  );
}
