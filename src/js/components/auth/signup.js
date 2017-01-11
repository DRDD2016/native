import React from 'react';
import { Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormTextInput, FormPasswordInput } from './form-components';
import { signupValidator as validate } from './form-validation';
import Spinner from '../common/Spinner';
import Button from '../common/Button';
import styles from '../../../styles';


function Signup ({ handleSubmit, handleSubmitForm, isSigningUp, navigator }) {

  const renderButton = () => {
    if (isSigningUp) {
      return <Spinner size="large" />;
    }
    return (
      <View style={ styles.row }>
        <Button
          buttonStyle={{ backgroundColor: '#578de5', padding: 10, flex: 1, borderRadius: 5 }}
          textStyle={{ alignSelf: 'center', color: '#fff' }}
          onPress={handleSubmit(handleSubmitForm)}
        >
          <Text>SIGN UP</Text>
        </Button>
      </View>
    );
  };

  return (
    <View style={{ marginTop: 25, flex: 1 }}>
      <Button
        onPress={ () => { navigator.pop(); }}
      >
        <Icon name="chevron-left" size={ 28 } color="#525459" />
      </Button>
      <View style={{ marginTop: 50 }}>
        <Text style={{ paddingLeft: 5 }}>First name</Text>
        <View style={ styles.row }>
          <Field name="firstname" component={ FormTextInput } />
        </View>

        <Text style={{ paddingLeft: 5 }}>Surname</Text>
        <View style={ styles.row }>
          <Field name="surname" component={ FormTextInput } />
        </View>

        <Text style={{ paddingLeft: 5 }}>Email</Text>
        <View style={ styles.row }>
          <Field name="email" component={ FormTextInput } />
        </View>

        <Text style={{ paddingLeft: 5 }}>Password</Text>
        <View style={ styles.row }>
          <Field name="password" component={ FormPasswordInput } />
        </View>
        <Text style={{ paddingLeft: 5 }}>Confirm password</Text>
        <View style={ styles.row }>
          <Field name="confirmPassword" component={ FormPasswordInput } />
        </View>
        { renderButton() }
      </View>
    </View>
  );
}

export default reduxForm({ form: 'signup', validate })(Signup);
