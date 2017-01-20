import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Router from '../../router';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

export default class Details extends Component {

  static route = {
    navigationBar: {
      title: 'Create event',
      backgroundColor: colours.blue,
      tintColor: colours.white
    }
  }

  nextPage = (name) => {
    this.props.navigator.push(Router.getRoute('what', { name }));
  }

  render () {
    const { name, description, note, handleChange } = this.props;
    const hideNext = name === '' || description === '';
    return (
      <View>
        <View style={ styles.container }>
          <Text>
            Enter the name of your event and a description.
          </Text>

          <View style={ styles.row }>
            <TextInput
              style={ styles.inputStyle }
              onChangeText={ text => handleChange(text, 'name') }
              value={ name }
              type="text"
              placeholder="Event name"
              autoCorrect
            />
          </View>
          <View style={ styles.row }>
            <TextInput
              style={ styles.inputStyle }
              onChangeText={ text => handleChange(text, 'description') }
              value={ description }
              type="text"
              placeholder="Event description"
              autoCorrect
            />
          </View>
          <View style={ styles.row }>
            <TextInput
              style={ styles.inputStyle }
              onChangeText={ text => handleChange(text, 'note') }
              value={ note }
              placeholder="Leave a note to your friends (optional)"
              autoCorrect
            />
          </View>
          <View style={ styles.row }>
            { (hideNext) &&
              <View />
            }
            { (!hideNext) &&
              <Button
                onPress={ () => this.nextPage(name) }
                buttonStyle={ styles.buttonStyle }
                buttonTextStyle={ styles.buttonTextStyle }
              >
                Next
              </Button>
            }
          </View>
        </View>
      </View>
    );
  }
}
