import React from 'react';
import { Text, View } from 'react-native';
import InputField from '../general/inputField';
// import styles from '../../../styles';

export function FormTextInput ({
  labelText,
  focussedColor,
  unfocussedColor,
  placeholder,
  isEmail,
  input: { value, onChange, onBlur },
  meta: { touched, error } }) {

  console.log('touched: ', touched);
  console.log('error: ', error);

  return (
    <View style={{ flex: 1 }}>

      <InputField
        // testDescription={testDescription}
        underlineColorAndroid="transparent"
        placeholder={ placeholder }
        autoCorrect={ false }
        autoCapitalize={ isEmail ? 'none' : 'words' }
        onChangeText={ text => onChange(text) }
        onBlur={ text => onBlur(text) }
        value={ value }
        type="text"
        labelType="notPoll"
        label={ labelText }
        // inputKey= { inputKey }
        // onChangeText={ text => handleChange(text, inputKey) }
        focussedColor={ focussedColor }
        unfocussedColor={ unfocussedColor }
      />


      {
        touched && error && <Text style={{ height: 25, color: 'red', fontSize: 16, marginVertical: 2 }}>{error}</Text>
      }
    </View>
  );
}

export function FormPasswordInput ({ labelText, focussedColor, unfocussedColor, placeholder, input: { value, onChange, onBlur }, meta: { touched, error } }) { // eslint-disable-line max-len
  return (
    <View style={{ flex: 1 }}>
      <InputField
        // testDescription={testDescription}
        underlineColorAndroid="transparent"
        placeholder={ placeholder }
        autoCorrect={ false }
        autoCapitalize="none"
        onChangeText={ text => onChange(text) }
        onBlur={ text => onBlur(text) }
        value={ value }
        type="password"
        labelType="notPoll"
        label={ labelText }
        // inputKey= { inputKey }
        // onChangeText={ text => handleChange(text, inputKey) }
        focussedColor={ focussedColor }
        unfocussedColor={ unfocussedColor }
        secureTextEntry
      />


      {
        touched && error && <Text style={{ color: '#ec3811', fontSize: 16, marginVertical: 2 }}>{error}</Text>
      }
    </View>
  );
}
