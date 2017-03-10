import React, { Component } from 'react';
import { View, Text, Switch, Dimensions } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const windowSize = Dimensions.get('window');

class DateTime extends Component {

  constructor (props) {
    super(props);
    this.state = {
      tbcSwitch: !this.props.data.time
    };
  }

  render () {
    const { data, handleDate, handleTime, removeInput, index } = this.props;
    return (
      <View key={ Math.random() } style={{ width: windowSize.width, alignItems: 'center' }}>
        <View style={{ margin: 10 }}>
          <DatePicker
            style={{ width: 180, marginRight: 60 }}
            date={ data.date }
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
            onDateChange={ date => handleDate(date, index) }
          />
        </View>

        <View style={{ margin: 10 }}>
          <DatePicker
            style={{ width: 180, marginRight: 60 }}
            date={ data.time && data.time }
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
              this.setState({ tbcSwitch: false });
              handleTime(time, index);
            }}
          />
        </View>
        { index !== 0 &&
          <Icon
            name="remove"
            size={18}
            color="gray"
            style={{ position: 'absolute', right: 100, top: 20 }}
            onPress={ removeInput }
          />
        }
        <View style={{ flexDirection: 'row', position: 'absolute', right: 15, top: 75 }}>
          <Switch
            onValueChange={ (switchValue) => {
              this.setState({ tbcSwitch: switchValue });
              const newTimeValue = switchValue ? '' : moment().format('HH:mm');
              handleTime(newTimeValue, index);
            }}
            value={ this.state.tbcSwitch }
          />
          <Text style={{ margin: 5 }}>TBC</Text>
        </View>

      </View>
    );
  }
}

export default DateTime;
