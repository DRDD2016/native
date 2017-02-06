import React from 'react';
import { View, TextInput } from 'react-native';
import styles from '../../../styles';

export default function Edit ({ event, handleDetailsChange }) {
  const { name, description, note, what, where, when } = event; // eslint-disable-line no-unused-vars
  return (
    <View>
      <View style={ styles.container }>
        <View style={ styles.row }>
          <TextInput
            style={ styles.inputStyle }
            onChangeText={ text => handleDetailsChange(text, 'name') }
            value={ name }
            type="text"
            placeholder="Event name"
            autoCorrect
          />
        </View>
        <View style={ styles.row }>
          <TextInput
            style={ styles.inputStyle }
            onChangeText={ text => handleDetailsChange(text, 'description') }
            value={ description }
            type="text"
            placeholder="Event description"
            autoCorrect
          />
        </View>
        <View style={ styles.row }>
          <TextInput
            style={ styles.inputStyle }
            onChangeText={ text => handleDetailsChange(text, 'note') }
            value={ note }
            placeholder="Leave a note to your friends (optional)"
            autoCorrect
          />
        </View>
      </View>
    </View>
  );
}
