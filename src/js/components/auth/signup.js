import React, { Component } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { persistor } from '../../init-store';
import { FormTextInput, FormPasswordInput } from './form-components';
import { signupValidator as validate } from './form-validation';
import Spinner from '../common/Spinner';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

class Signup extends Component {

  static route = {
    navigationBar: {
      title: 'Sign up',
      tintColor: colours.white,
      backgroundColor: colours.blue
    }
  }

  componentWillMount () {
    persistor.pause();
  }

  renderButton = () => {
    const { handleSubmit, handleSubmitForm, isSigningUp } = this.props;
    if (isSigningUp) {
      return <Spinner size="large" />;
    }
    return (
      <View style={ styles.row }>
        <Button
          buttonStyle={{ backgroundColor: colours.blue, padding: 10, flex: 1, borderRadius: 5, paddingVertical: 15, marginVertical: 15 }}
          textStyle={{ alignSelf: 'center', color: '#fff' }}
          onPress={handleSubmit(handleSubmitForm)}
        >
          <Text>SIGN UP</Text>
        </Button>
      </View>
    );
  };

  renderServerError = () => {
    if (this.props.serverError) {
      return (
        <View style={ styles.row }>
          <Text style={{ color: 'red' }}>{this.props.serverError}</Text>
        </View>
      );
    }
  }

  render () {

    return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
        >
          <View style={{ flex: 1, justifyContent: 'center', marginBottom: 30 }}>
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
                <Field name="email" component={ FormTextInput } isEmail />
              </View>

              <Text style={{ paddingLeft: 5 }}>Password</Text>
              <View style={ styles.row }>
                <Field name="password" component={ FormPasswordInput } />
              </View>
              <Text style={{ paddingLeft: 5 }}>Confirm password</Text>
              <View style={ styles.row }>
                <Field name="confirmPassword" component={ FormPasswordInput } />
              </View>
              { this.renderServerError() }
              { this.renderButton() }
            </View>
          </View>
          <View style={{ height: 30 }} />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'signup', validate })(Signup);
export default hoistNonReactStatic(decoratedComponent, Signup);
