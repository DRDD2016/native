import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { FormTextInput, FormPasswordInput } from './form-components';
import { loginValidator as validate } from './form-validation';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

class Login extends Component {

  static route = {
    navigationBar: {
      title: 'Login',
      tintColor: colours.white,
      backgroundColor: colours.blue
    }
  }

  render () {
    const { handleSubmit, handleSubmitForm } = this.props;

    return (
      <View style={{ flex: 1 }}>
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
}

const decoratedComponent = reduxForm({ form: 'login', validate })(Login);
export default hoistNonReactStatic(decoratedComponent, Login);
