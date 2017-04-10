import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { FormTextInput } from './auth/form-components';
import { codeValidator as validate } from './auth/form-validation';
import Button from './common/Button';
import Spinner from './common/Spinner';
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

  renderButton = () => {
    const { handleSubmit, handleSubmitForm, isFetching } = this.props;
    if (isFetching) {
      return <Spinner size="large" />;
    }
    return (
      <View style={ styles.row }>
        <Button
          buttonStyle={inlineStyle.buttonStyle}
          textStyle={inlineStyle.textStyle}
          onPress={handleSubmit(handleSubmitForm)}
        >
          <Text>JOIN EVENT</Text>
        </Button>
      </View>
    );
  };

  renderAlert = () => {
    setTimeout(() => {
      this.props.navigator.showLocalAlert('You are not connected to Internet!', {
        text: { color: '#fff' },
        container: { backgroundColor: 'red' }
      });
    }, 2000);
  }

  render () {
    const { codeError, isConnected } = this.props;

    return (
      <View style={{ flex: 1 }}>
        { !isConnected && this.renderAlert() }
        <View style={{ alignItems: 'center', marginHorizontal: 10, marginTop: 50, marginBottom: 70 }}>
          <Text>If your friend has sent you a code to join their event, enter the code below to respond to their invitation.</Text>
        </View>
        <View style={ styles.container }>
          <Text style={inlineStyle.labelStyle}>Event Code:</Text>
          <View style={ styles.row }>
            <Field style={styles.input} name="code" component={ FormTextInput } placeholder="Enter code here" />
          </View>
          { this.renderButton() }

          {
            codeError &&
            <Text style={{ color: 'red' }}>{ codeError }</Text>
          }
        </View>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'code', validate })(Code);
export default hoistNonReactStatic(decoratedComponent, Code);
