import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { emailValidator as validate } from './form-validation';
import { FormTextInput } from './form-components';
import Button from '../common/Button';
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

  render () {
    const { handleSubmit, handleSubmitForm } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 70 }}>
          <Text>Explanation text</Text>
        </View>
        <View style={ styles.container }>
          <Text style={inlineStyle.labelStyle}>Email</Text>
          <View style={ styles.row }>
            <Field name="email" component={ FormTextInput } isEmail />
          </View>
          <View style={ styles.row }>
            <Button
              buttonStyle={inlineStyle.buttonStyle}
              textStyle={inlineStyle.textStyle}
              onPress={handleSubmit(handleSubmitForm)}
            >
              <Text>SUBMIT</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'confirmEmail', validate })(ConfirmEmail);
export default hoistNonReactStatic(decoratedComponent, ConfirmEmail);
