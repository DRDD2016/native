/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, DatePickerIOS } from 'react-native';
import Router from '../../router';
import AddInput from '../general/add-input';
import EventDetailsHeader from '../general/event-details-header';
import Button from '../common/Button';
import styles from '../../../styles';

const When = ({ name, description, data, addInput, removeInput, handleDate, handleTime, navigator }) => {

  const nextPage = () => {
    navigator.push(Router.getRoute('invite'));
  };

  const inputs = data.map((value, i) => {
    return (
      <View>
        <DatePickerIOS
          date={ value.date }
          mode="date"
          onDateChange={ date => handleDate(date, i) }
        />
        <DatePickerIOS
          date={ value.time }
          mode="time"
          onDateChange={ time => handleTime(time, i) }
          minuteInterval={ 10 }
        />
      </View>
    );
  });

  const hideNext = data[0].date === '';

  return (

    <View>
      <View style={styles.rowEventDetailsHeader}>

        <EventDetailsHeader
          location="Enter details"
          eventName={ name }
          eventDescription={ description }
        />

      </View>
      <View style={styles.container}>

        <Text style={styles.smallMessageText}>
          Enter a date and a time for your event (or leave them blank to decide later).
        </Text>
        <Text style={styles.smallMessageText}>
          You can add more than one option to create a poll.
        </Text>
      </View>
      <View style={styles.whenContainer}>
        { inputs }

        <AddInput data={ data } handler={ addInput } />
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          { (hideNext) &&
            <View />
          }
          { (!hideNext) &&
            <Button
              buttonStyle={styles.buttonStyle}
              onPress={ () => nextPage() }
            >
              Next
            </Button>
          }
        </View>
      </View>

    </View>
  );
};

export default When;
