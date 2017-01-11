import React from 'react';
import { Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormTextInput, FormPasswordInput } from './form-components';
import { loginValidator as validate } from './form-validation';
import styles from '../../../styles';
import Button from '../common/Button';

function Login ({ handleSubmit, handleSubmitForm, navigator }) {

  return (
    <View style={{ marginTop: 25, flex: 1 }}>
      <Button
        onPress={ () => { navigator.pop(); }}
      >
        <Icon name="chevron-left" size={ 28 } color="#525459" />
      </Button>
      <View style={{ marginTop: 50 }}>
        <Text style={{ paddingLeft: 5 }}>Email</Text>
        <View style={ styles.row }>
          <Field name="email" component={ FormTextInput } />
        </View>

        <Text style={{ paddingLeft: 5 }}>Password</Text>
        <View style={ styles.row }>
          <Field name="password" component={ FormPasswordInput } />
        </View>
        <View style={ styles.row }>
          <Button
            buttonStyle={{ backgroundColor: '#578de5', padding: 10, flex: 1, borderRadius: 5 }}
            textStyle={{ alignSelf: 'center', color: '#fff' }}
            onPress={handleSubmit(handleSubmitForm)}
          >
            <Text>LOGIN</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

export default reduxForm({ form: 'login', validate })(Login);
