import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { FormPasswordInput } from './form-components';
import { passwordValidator as validate } from './form-validation';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const inlineStyle = {
  buttonStyle: {
    backgroundColor: colours.blue,
    padding: 10,
    flex: 1,
    borderRadius: 5,
    paddingVertical: 15,
    marginVertical: 15
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

class ResetPassword extends Component {

  static route = {
    navigationBar: {
      title: 'Enter your new password',
      backgroundColor: colours.blue,
      tintColor: colours.white
    }
  }

  renderButton = () => {
    const { handleSubmit, handleSubmitForm, isResetting } = this.props;
    if (isResetting) {
      return <Spinner size="large" />;
    }
    return (
      <View style={ styles.row }>
        <Button
          buttonStyle={ inlineStyle.buttonStyle }
          textStyle={ inlineStyle.textStyle }
          onPress={handleSubmit(handleSubmitForm)}
        >
          <Text>RESET</Text>
        </Button>
      </View>
    );
  };

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 70 }}>
          <Text>Explanation text</Text>
        </View>
        <View style={ styles.container }>
          <Text style={ inlineStyle.labelStyle }>New password</Text>
          <View style={ styles.row }>
            <Field name="password" component={ FormPasswordInput } />
          </View>
          <Text style={ inlineStyle.labelStyle }>Confirm password</Text>
          <View style={ styles.row }>
            <Field name="confirmPassword" component={ FormPasswordInput } />
          </View>
          { this.renderButton() }
        </View>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'newPassword', validate })(ResetPassword);
export default hoistNonReactStatic(decoratedComponent, ResetPassword);
