import React, { Component } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Fabric from 'react-native-fabric';
import { persistor } from '../../init-store';
import { FormTextInput, FormPasswordInput } from './form-components';
import { signupValidator as validate } from './form-validation';
import Spinner from '../common/Spinner';
import Button from '../common/Button';
import Header from '../common/Header';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const { Answers } = Fabric;

class Signup extends Component {

  static navigationOptions = {
    title: 'Sign up'
  }

  componentWillMount () {
    persistor.pause();
  }

  componentDidMount () {
    Answers.logCustom('Visited SignUpScreen', { additionalData: 'nothing' });
  }

  renderButton = () => {
    const { handleSubmit, handleSubmitForm, isSigningUp } = this.props;
    if (isSigningUp) {
      return <Spinner size="large" />;
    }
    return (
      <View>
        <Button
          buttonStyle={ [styles.confirmButton, { backgroundColor: colours.orange, borderColor: colours.orange, flex: 1 }] }
          textStyle={ styles.confirmButtonText }
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
      <View>
        <Header />
        <ScrollView>
          <KeyboardAvoidingView
            behavior="padding"
          >
            <View style={{ flex: 1, justifyContent: 'center', marginBottom: 30 }}>
              <View style={{ marginTop: 70 }}>

                <View style={ [styles.row, { marginHorizontal: 10 }] }>
                  <Field name="firstname" component={ FormTextInput } placeholder="* First name" />
                </View>


                <View style={ [styles.row, { marginHorizontal: 10 }] }>
                  <Field name="surname" component={ FormTextInput } placeholder="* Surname" />
                </View>


                <View style={ [styles.row, { marginHorizontal: 10 }] }>
                  <Field name="email" component={ FormTextInput } placeholder="* Email" isEmail />
                </View>


                <View style={ [styles.row, { marginHorizontal: 10 }] }>
                  <Field name="password" component={ FormPasswordInput } placeholder="* Password" />
                </View>

                <View style={ [styles.row, { marginHorizontal: 10 }] }>
                  <Field name="confirmPassword" component={ FormPasswordInput } placeholder="* Confirm password" />
                </View>
                <View style={ [styles.row, { justifyContent: 'flex-end' }] }>
                  <Text>* Mandatory fields</Text>
                </View>
                { this.renderServerError() }
                { this.renderButton() }
              </View>
            </View>
            <View style={{ height: 30 }} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'signup', validate })(Signup);
export default hoistNonReactStatic(decoratedComponent, Signup);
