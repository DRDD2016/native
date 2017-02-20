import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from '../../../styles';

export function FormTextInput ({ isEmail, isLoginView, input: { value, onChange, onBlur }, meta: { touched, error } }) {
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={ isLoginView ? [styles.inputStyle, { fontSize: 19 }, { borderRadius: 0 }] : [styles.inputStyle, { fontSize: 19 }] }
        onChangeText={ text => onChange(text) }
        onBlur={ text => onBlur(text) }
        value={ value }
        type="text"
        autoCapitalize={ isEmail ? 'none' : 'words' }
        autoCorrect={ false }
      />
      {
        touched && error && <Text style={{ color: '#ec3811' }}>{error}</Text>
      }
    </View>
  );
}

export function FormPasswordInput ({ isLoginView, input: { value, onChange, onBlur }, meta: { touched, error } }) {
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={ isLoginView ? [styles.inputStyle, { fontSize: 19 }, { borderRadius: 0 }] : [styles.inputStyle, { fontSize: 19 }] }
        onChangeText={ text => onChange(text) }
        onBlur={ text => onBlur(text) }
        value={ value }
        type="password"
        secureTextEntry
      />
      {
        touched && error && <Text style={{ color: '#ec3811' }}>{error}</Text>
      }
    </View>
  );
}
