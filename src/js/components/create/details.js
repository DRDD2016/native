import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Router from '../../router';
import Button from '../common/Button';
import Header from '../common/Header';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import { store } from '../../init-store';
import { clearCreateEvent } from '../../actions/create';
import discardEvent from '../../lib/discard-event';

export default class Details extends Component {

  static route = {
    navigationBar: {
      title: 'Create event',
      backgroundColor: colours.transparent,
      tintColor: colours.darkgray,
      renderRight: () => {
        return (
          <Button
            onPress={ discardEvent }
            buttonStyle={{ margin: 15 }}
            textStyle={{ color: colours.darkgray, fontWeight: '600' }}
          >
            <Text>Cancel</Text>
          </Button>
        );
      }
    }
  }

  componentWillMount () {
    store.dispatch(clearCreateEvent());
  }

  nextPage = (name) => {
    this.props.navigator.push(Router.getRoute('what', { name }));
  }

  render () {
    const { name, description, note, handleChange } = this.props;
    const hideNext = name === '' || description === '';
    return (
      <View>
        <Header />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginHorizontal: 20,
            marginTop: 70 }}
        >
          <Text style={{ fontWeight: '700', color: colours.gray }}>
            Enter the name of your event and a description.
          </Text>

          <View style={ styles.row }>
            <TextInput
              underlineColorAndroid="transparent"
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
              underlineColorAndroid="transparent"
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
              underlineColorAndroid="transparent"
              style={ [styles.inputStyle, { height: 100 }] }
              onChangeText={ text => handleChange(text, 'note') }
              value={ note }
              multiline
              numberOfLines={5}
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
                buttonStyle={[styles.buttonStyle, { flex: 1 }]}
                textStyle={ styles.buttonTextStyle }
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
