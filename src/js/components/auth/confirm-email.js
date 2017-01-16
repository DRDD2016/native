import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const inlineStyle = {
  buttonStyle: {
    backgroundColor: '#578de5',
    padding: 10,
    flex: 1,
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

export default class ConfirmEmail extends Component {

  static route = {
    navigationBar: {
      title: 'Forgot your password?',
      backgroundColor: colours.blue,
      tintColor: colours.white
    }
  }

  render () {
    return (
      <View style={ styles.container }>
        <Text style={ inlineStyle.labelStyle }>Email</Text>
        <View style={ styles.row }>
          <TextInput
            style={ styles.inputStyle }
            onChangeText={ () => console.log('onchange') }
            value=""
            type="text"
          />
        </View>
        <View style={ styles.row }>
          <Button
            buttonStyle={ inlineStyle.buttonStyle }
            textStyle={ inlineStyle.textStyle }
            onPress={() => console.log('handle submit') }
          >
            <Text>Reset</Text>
          </Button>
        </View>
      </View>
    );
  }

}
