import React, { Component } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fabric from 'react-native-fabric';
import { persistor } from '../../init-store';
import { FormTextInput, FormPasswordInput } from './form-components';
import Header from '../common/Header';
import { loginValidator as validate } from './form-validation';
import colours from '../../../styles/colours';
import styles from '../../../styles';

const { Answers } = Fabric;

const inlineStyles = {
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 12,
    height: 45,
    backgroundColor: 'transparent'
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 20
  },
  iconWrap: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.blue
  },
  button: {
    backgroundColor: colours.blue,
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18
  },
  forgotPasswordText: {
    color: colours.blue,
    textAlign: 'center'
  }
};

class Login extends Component {

  static route = {
    navigationBar: {
      title: 'Login',
      tintColor: colours.white,
      backgroundColor: colours.transparent
    }
  }

  componentWillMount () {
    persistor.pause();
  }

  componentDidMount () {
    Answers.logCustom('Visited LoginScreen', { additionalData: 'nothing' });
  }

  renderServerError = () => {
    if (this.props.serverError) {
      return <Text style={{ color: 'red' }}>{this.props.serverError}</Text>;
    }
  }

  renderAlert = () => {
    setTimeout(() => {
      this.props.navigator.showLocalAlert('You are not connected to Internet!', {
        text: { color: '#fff' },
        container: { backgroundColor: 'red' }
      });
    }, 2000);
  }

  render () {
    const { handleSubmit, handleSubmitForm, isConnected, navigator } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <KeyboardAvoidingView
          style={{ flex: 1, marginTop: 70 }}
          behavior="padding"
        >
          <View />
          { !isConnected && this.renderAlert() }
          <View style={{ paddingHorizontal: 15, flex: 1 }}>
            <View style={inlineStyles.inputWrap}>
              <View style={inlineStyles.iconWrap}>
                <Icon name="envelope-o" size={15} color="rgba(255, 255, 255, 0.76)" />
              </View>
              <Field style={inlineStyles.input} name="email" component={ FormTextInput } isEmail isLoginView placeholder="email address" />
            </View>
            <View style={inlineStyles.inputWrap}>
              <View style={inlineStyles.iconWrap}>
                <Icon name="lock" size={20} color="rgba(255, 255, 255, 0.76)" />
              </View>
              <Field style={inlineStyles.input} name="password" component={ FormPasswordInput } isLoginView placeholder="password" />
            </View>
            { this.renderServerError() }
            <TouchableOpacity activeOpacity={ 0.5 } onPress={handleSubmit(handleSubmitForm)}>
              <View style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>LOG IN</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 5, paddingTop: 10 }} activeOpacity={ 0.5 } onPress={() => navigator.push('confirmEmail')}>
              <View>
                <Text style={inlineStyles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={inlineStyles.container} />
          <View style={{ height: 30 }} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'login', validate })(Login);
export default hoistNonReactStatic(decoratedComponent, Login);
