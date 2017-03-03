import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      backgroundColor: colours.blue
    }
  }

  nextPage = (name) => {
    this.props.navigator.push(Router.getRoute('confirm', { name }));
  };

  render () {
    const { name, data, addInput, handleDate, handleTime, removeInput } = this.props;
    const inputs = data.map((value, i) => {
      return (
        <View key={ Math.random() }>
          <View style={{ margin: 10 }}>
            <DatePicker
              style={{ width: 200 }}
              date={ value.date }
              mode="date"
              placeholder="select date"
              format="DD/MM/YYYY"
              minDate={ moment().format('DD MM YYYY')}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={ date => handleDate(date, i) }
            />
          </View>

          <View style={{ margin: 10 }}>
            <DatePicker
              style={{ width: 200 }}
              date={ value.time }
              mode="time"
              placeholder="select time"
              format="HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minuteInterval={10}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={ time => handleTime(time, i) }
            />
          </View>
          { i !== 0 &&
            <Icon
              name="remove"
              size={18}
              color="gray"
              style={{ position: 'absolute', right: 100, top: 20 }}
              onPress={ removeInput }
            />
          }
        </View>
      );
    });

    const hideNext = data[0].date === '';

    return (
      <ScrollView>
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
      </ScrollView>
    );
  }
}
