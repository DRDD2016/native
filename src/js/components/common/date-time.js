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
        <View style={{ flexDirection: 'row', flex: 1, marginTop: 10, marginHorizontal: 10 }}>
          <View style={{ flex: 0.1 }} />
          <DatePicker
            style={{ flex: 2.5 }}
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
          { index !== 0 &&
            <View
              style={{ flex: 1, paddingLeft: 5, justifyContent: 'center' }}
            >
              <View>
                <Icon
                  name="remove"
                  size={18}
                  color="gray"
                  style={{ flex: 1 }}
                  onPress={ removeInput }
                />
              </View>
            </View>
          }
          { index === 0 &&
            <View
              style={{ flex: 1, paddingLeft: 5 }}
            />
          }
        </View>

        <View style={{ flexDirection: 'row', flex: 1, margin: 10 }}>
          <View style={{ flex: 0.1 }} />
          <DatePicker
            style={{ flex: 2.5 }}
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
          <View style={{ flexDirection: 'row', flex: 1, paddingLeft: 5, alignItems: 'center' }}>
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

      </View>
    );
  }
}

export default DateTime;
