import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Router from '../../router';
import EventDetailsHeader from '../general/event-details-header';
import Button from '../common/Button';
import styles from '../../../styles';

export default function Details ({ handleChange, name, description, note, title, navigator }) {

  const hideNext = name === '' || description === '';

  const nextPage = () => {
    navigator.push(Router.getRoute('what'));
  };

  return (
    <View>
      <EventDetailsHeader
        location={ title }
        eventName={ name }
        eventDescription={ description }
      />
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
          />
        </View>
        <View style={ styles.row }>
          <TextInput
            style={ styles.inputStyle }
            onChangeText={ text => handleChange(text, 'description') }
            value={ description }
            type="text"
            placeholder="Event description"
          />
        </View>
        <View style={ styles.row }>
          <TextInput
            style={ styles.inputStyle }
            onChangeText={ text => handleChange(text, 'note') }
            value={ note }
            placeholder="Leave a note to your friends (optional)"
          />
        </View>
        <View style={ styles.row }>
          { (hideNext) &&
            <View />
          }
          { (!hideNext) &&
            <Button
              onPress={ () => nextPage() }
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
