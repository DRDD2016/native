import React, { Component } from 'react';
import { View, Text, DatePickerIOS, ScrollView } from 'react-native';
import Router from '../../router';
import AddInput from '../general/add-input';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

export default class When extends Component {

  static route = {
    navigationBar: {
      title (params) {
        return params.name;
      },
      tintColor: colours.white,
      backgroundColor: colours.blue,
    }
  }

  nextPage = (name) => {
    this.props.navigator.push(Router.getRoute('confirm', { name }));
  };

  render () {
    const { name, data, addInput, removeInput, handleDate, handleTime } = this.props;
    const inputs = data.map((value, i) => {
      return (
        <View
          key={ value.date }
        >
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
      <ScrollView>
        <View>
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
                  onPress={ () => this.nextPage(name) }
                >
                  Next
                </Button>
              }
            </View>
          </View>

        </View>
      </ScrollView>
    );
  }
}
