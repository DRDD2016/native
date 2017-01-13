import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Input from '../general/input';
import Router from '../../router';
import AddInput from '../general/add-input';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

export default class Where extends Component {

  static route = {
    navigationBar: {
      title (params) {
        return params.name;
      },
      tintColor: colours.white,
      backgroundColor: colours.blue,
    }
  }

  nextPage = () => {
    this.props.navigator.push(Router.getRoute('when'));
  };

  render () {
    const { data, description, addInput, removeInput, handleChange } = this.props;
    const inputCount = data.length;
    const inputs = data.map((value, i) => {
      return (
        <Input
          key={ i }
          handleChange={ handleChange }
          inputKey={ i }
          inputCount={ inputCount }
          value={ value }
          placeholder="Where?"
          removeInput={ removeInput }
        />
      );
    });

    const hideNext = data[0] === '';

    return (
      <View>
        <View style={ styles.container }>
          <Text style={ styles.smallMessageText} >
            Enter where the event will take place (or leave blank to decide it later).
          </Text>
          <Text style={ styles.smallMessageText }>
            You can add more than one option to create a poll.
          </Text>

          { inputs }

          <AddInput data={ data } handler={ addInput } />

          <View style={ styles.row }>
            { (hideNext) &&
              <View />
            }
            { (!hideNext) &&
              <Button
                buttonStyle={ styles.buttonStyle }
                onPress={ this.nextPage }
              >
                Next
              </Button>
            }
          </View>
        </View>
      </View>
    );
  }
};
