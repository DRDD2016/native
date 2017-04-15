/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../general/input';
import Router from '../../router';
import AddInput from '../general/add-input';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import discardEvent from '../../lib/discard-event';

export default class What extends Component {

  static route = {
    navigationBar: {
      title (params) {
        return params.name;
      },
      tintColor: colours.white,
      backgroundColor: colours.blue,
      renderRight: () => {
        return (
          <Button
            onPress={ discardEvent }
            buttonStyle={{ margin: 15 }}
            textStyle={{ color: colours.white, fontWeight: '600' }}
          >
            <Text>Cancel</Text>
          </Button>
        );
      }
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
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#fff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={ styles.container }>
          <Text style={ styles.smallMessageText }>
            Enter what your event will be (or leave blank to decide it later).
          </Text>
          <Text style={ styles.smallMessageText }>
            You can add more than one option to create a poll.
          </Text>

          { inputs }

          <View style={ styles.row }>
            <AddInput data={ data } handler={ addInput } />
          </View>

          <View style={ styles.row }>
            <Button
              onPress={ () => this.nextPage(name) }
              buttonStyle={ [styles.buttonStyle, { flex: 1 }] }
              textStyle={ styles.buttonTextStyle }
            >
              Next
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
