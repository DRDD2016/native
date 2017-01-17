import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from '../../../styles';


export function FormTextInput ({ isEmail, input: { value, onChange }, meta: { touched, error } }) {
  console.log(isEmail);
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={ styles.inputStyle }
        onChangeText={ text => onChange(text) }
        value={ value }
        type="text"
        autoCapitalize={ isEmail ? 'none' : 'words' }
        autoCorrect={ false }
      />
      {
        touched && error && <Text>{error}</Text>
      }
    </View>
  );
}

export function FormPasswordInput ({ input: { value, onChange }, meta: { touched, error } }) {
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={ styles.inputStyle }
        onChangeText={ text => onChange(text) }
        value={ value }
        type="password"
        secureTextEntry
      />
      {
        touched && error && <Text>{error}</Text>
      }
    </View>
  );
}
