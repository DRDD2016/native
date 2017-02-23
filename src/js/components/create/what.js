/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Input from '../general/input';
import Router from '../../router';
import AddInput from '../general/add-input';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

export default class What extends Component {

  static route = {
    navigationBar: {
      title (params) {
        return params.name;
      },
      tintColor: colours.white,
      backgroundColor: colours.blue
    }
  }

  nextPage = (name) => {
    this.props.navigator.push(Router.getRoute('where', { name }));
  }

  render () {
    const { data, name, addInput, removeInput, handleChange } = this.props;
    const inputCount = data.length;

    const inputs = data.map((value, i) => {
      return (
        <Input
          style={styles.inputStyle}
          handleChange={ handleChange }
          key={ i }
          inputCount={ inputCount }
          value={ value }
          inputKey={ i }
          removeInput={ removeInput }
          placeholder="What would you like to do?"
        />
      );
    });

    return (
      <View>
        <View style={ styles.container }>
          <Text style={ styles.smallMessageText }>
            Enter what your event will be (or leave blank to decide it later).
          </Text>
          <Text style={ styles.smallMessageText }>
            You can add more than one option to create a poll.
          </Text>

          { inputs }

          <AddInput data={ data } handler={ addInput } />

          <View style={ styles.row }>
            <Button
              onPress={ () => this.nextPage(name) }
              buttonStyle={ styles.buttonStyle }
              buttonTextStyle={ styles.buttonTextStyle }
            >
              Next
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
