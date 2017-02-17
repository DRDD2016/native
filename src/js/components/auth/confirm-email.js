import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { emailValidator as validate } from './form-validation';
import { FormTextInput } from './form-components';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const inlineStyle = {
  buttonStyle: {
    backgroundColor: colours.blue,
    flex: 1,
    paddingVertical: 15,
    marginVertical: 15,
    borderRadius: 5
  },
  labelStyle: {
    alignSelf: 'flex-start',
    paddingLeft: 10
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff'
  }
};

class ConfirmEmail extends Component {

  static route = {
    navigationBar: {
      title: 'Forgot your password?',
      backgroundColor: colours.blue,
      tintColor: colours.white
    }
  }

  renderServerError = () => {
    if (this.props.error) {
      return <Text style={{ color: 'red' }}>{ this.props.error }</Text>;
    }
  }

  renderServerMessage = () => {
    if (this.props.message) {
      return <Text style={{ color: 'green' }}>{ this.props.message }</Text>;
    }
  }

  renderButton = () => {
    const { handleSubmit, handleSubmitForm, isConfirming } = this.props;
    console.log('isConfirming', isConfirming);
    if (isConfirming) {
      return <Spinner size="large" />;
    }
    return (
      <Button
        buttonStyle={inlineStyle.buttonStyle}
        textStyle={inlineStyle.textStyle}
        onPress={handleSubmit(handleSubmitForm)}
      >
        <Text>SUBMIT</Text>
      </Button>
    );
  };

  render () {
    // const { handleSubmit, handleSubmitForm } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 70 }}>
          <Text>Explanation text</Text>
          { this.renderServerMessage() }
        </View>
        <View style={ styles.container }>
          <Text style={inlineStyle.labelStyle}>Email</Text>
          <View style={ styles.row }>
            <Field name="email" component={ FormTextInput } isEmail />
          </View>
          { this.renderServerError() }
          <View style={ styles.row }>
            { this.renderButton() }
          </View>
        </View>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'confirmEmail', validate })(ConfirmEmail);
export default hoistNonReactStatic(decoratedComponent, ConfirmEmail);
