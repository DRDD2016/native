import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Icon from 'react-native-vector-icons/FontAwesome';
import { persistor } from '../../init-store';
import { FormTextInput, FormPasswordInput } from './form-components';
import { loginValidator as validate } from './form-validation';
import colours from '../../../styles/colours';

const styles = {
  container: {
    flex: 1
  },
  wrapper: {
    paddingHorizontal: 15
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
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
    borderRadius: 5
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18
  },
  forgotPasswordText: {
    color: '#000',
    textAlign: 'center'
  }
};

class Login extends Component {

  static route = {
    navigationBar: {
      title: 'Login',
      tintColor: colours.white,
      backgroundColor: colours.blue
    }
  }

  componentWillMount () {
    persistor.pause();
  }

  renderServerError = () => {
    if (this.props.serverError) {
      return <Text style={{ color: 'red' }}>{this.props.serverError}</Text>;
    }
  }

  render () {
    const { handleSubmit, handleSubmitForm, navigator } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container} />
        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Icon name="envelope-o" size={15} color="rgba(255, 255, 255, 0.76)" />
            </View>
            <Field style={styles.input} name="email" component={ FormTextInput } isEmail isLoginView />
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Icon name="lock" size={20} color="rgba(255, 255, 255, 0.76)" />
            </View>
            <Field style={styles.input} name="password" component={ FormPasswordInput } isLoginView />
          </View>
          { this.renderServerError() }
          <TouchableOpacity activeOpacity={ 0.5 } onPress={handleSubmit(handleSubmitForm)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={ 0.5 } onPress={() => navigator.push('confirmEmail')}>
            <View>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container} />
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'login', validate })(Login);
export default hoistNonReactStatic(decoratedComponent, Login);
