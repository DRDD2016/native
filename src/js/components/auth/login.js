import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { FormTextInput, FormPasswordInput } from './form-components';
import { loginValidator as validate } from './form-validation';
import styles from '../../../styles';


function Login ({ handleSubmit, handleSubmitForm }) {

  return (
    <View style={{ marginTop: 50 }}>
      <Text style={{ paddingLeft: 5 }}>Email</Text>
      <View style={ styles.row }>
        <Field name="email" component={ FormTextInput } />
      </View>

      <Text style={{ paddingLeft: 5 }}>Password</Text>
      <View style={ styles.row }>
        <Field name="password" component={ FormPasswordInput } />
      </View>

      <TouchableHighlight
        onPress={handleSubmit(handleSubmitForm)}
      >
        <Text>SIGN UP</Text>
      </TouchableHighlight>
    </View>
  );
}

export default reduxForm({ form: 'login', validate })(Login);
