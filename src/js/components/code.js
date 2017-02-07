import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { FormTextInput } from './auth/form-components';
import { codeValidator as validate } from './auth/form-validation';
import Button from './common/Button';
import styles from '../../styles';
import colours from '../../styles/colours';

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

class Code extends Component {

  static route = {
    navigationBar: {
      title: 'Enter Your Event Code',
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
          <Text style={inlineStyle.labelStyle}>Event Code</Text>
          <View style={ styles.row }>
            <Field name="code" component={ FormTextInput } />
          </View>
          <View style={ styles.row }>
            <Button
              buttonStyle={inlineStyle.buttonStyle}
              textStyle={inlineStyle.textStyle}
              onPress={handleSubmit(handleSubmitForm)}
            >
              <Text>JOIN EVENT</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'code', validate })(Code);
export default hoistNonReactStatic(decoratedComponent, Code);
