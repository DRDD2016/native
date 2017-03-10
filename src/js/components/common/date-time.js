import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

class DateTime extends Component {

  constructor () {
    super();
    this.state = {
      tbcSwitch0: undefined,
      tbcSwitch1: undefined,
      tbcSwitch2: undefined
    };
  }

  render () {
    const { data, handleDate, handleTime, removeInput } = this.props;
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
              date={ value.time && value.time }
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
              onDateChange={ (time) => {
                this.setState({ [`tbcSwitch${i}`]: false });
                handleTime(time, i);
              }}
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
          <View style={{ flexDirection: 'row', position: 'absolute', right: 40, top: 75 }}>
            <Switch
              onValueChange={ (switchValue) => {
                this.setState({ [`tbcSwitch${i}`]: switchValue });
                const newTimeValue = switchValue ? '' : moment().format('HH:mm');
                handleTime(newTimeValue, i);
              }}
              value={ this.state[`tbcSwitch${i}`] }
            />
            <Text style={{ margin: 5 }}>TBC</Text>
          </View>

        </View>
      );
    });
    return (
      <View>
        {inputs}
      </View>
    );
  }
}

export default DateTime;
