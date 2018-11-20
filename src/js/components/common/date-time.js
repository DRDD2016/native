/* eslint-disable max-len */
/* eslint-disable object-property-newline */
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import colours from '../../../styles/colours';
import Button from '../common/Button';
import styles from '../../../styles';
import { scale } from '../../../styles/scaling';

const inputCardStyle = {
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 0,
    minHeight: 32,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'darkgray',
    shadowOffset: { height: 2, width: 0 }
};

const labelStyle = {
  color: colours.main
};

const containerStyle = {
  width: '85%',
  flexDirection: 'row',
  borderColor: 'red',
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: 700
};

// const inputStyle = {
//   color: colours.darkgray,
//   marginTop: 2,
//   marginBottom: 2,
//   paddingHorizontal: 10,
//   fontSize: 16,
//   fontWeight: '400',
//   height: 45,
//   width: '100%',
//   flexDirection: 'row',
//   // elevation: 1, // replaces shadow on Android, shadow props IOS only
//   // shadowOpacity: 0.75,
//   // shadowRadius: 5,
//   // shadowColor: 'darkgray',
//   // shadowOffset: { height: 2, width: 0 },
//   backgroundColor: 'transparent',
//   overflow: 'hidden',
//   borderWidth: 0, // remove to put back border
//   borderBottomColor: colours.main,
//   borderBottomWidth: 2, // remove 'Bottom' to make full border
//   borderRadius: 0, // 5
//   alignSelf: 'flex-start',
//   justifyContent: 'center'
// };

class DateTime extends Component {

  constructor (props) {
    super(props);
    this.state = {
      tbcSwitch: !this.props.data.time
    };
  }

  render () {
    const { labelType, label, data, handleDate, handleTime, removeInput, index, inputKey } = this.props;

    const labelPoll = `${label} - Option ${index + 1}`;
    const labelNotPoll = `${label}`;
    const labelText = labelType === 'poll' ? labelPoll : labelNotPoll;

    return (

      <View
        style={inputCardStyle}
      >
        <View
          style={containerStyle}
        >
          <View style={{
            width: '100%',
            borderColor: 'green',
            borderWidth: 1,
            flexDirection: 'column',
            alignItems: 'center'
          }}>


            <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
              {
                <Text style={labelStyle}>
                  {labelText}
                </Text>
              }

            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginTop: 5,
              borderColor: 'purple',
              borderWidth: 1,
              paddingLeft: 0,
              paddingRight: 0
            }}>

              <View
                accessibilityLabel={`Date option ${index + 1}`}
                style={{ width: '50%', borderColor: 'blue',
                borderWidth: 1, justifyContent: 'flex-start', flexDirection: 'row' }}
              >
                <View style={{ borderColor: 'red',
                borderWidth: 1, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: '30%', borderColor: 'pink',
                  borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <IconM name="calendar-blank" size={scale(24)} color={colours.when} />
                  </View>
                  <DatePicker
                    showIcon={false}
                    style={{ width: '70%', maxWidth: 300 }}
                    date={ data.date }
                    mode="date"
                    placeholder="select date"
                    format="DD/MM/YYYY"
                    minDate={ moment().format('DD MM YYYY')}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {

                      },
                      dateInput: {
                        marginLeft: 5,
                        borderWidth: 0,
                        borderBottomColor: colours.when,
                        borderBottomWidth: 2
                      }
                    }}
                    onDateChange={ date => handleDate(date, index) }
                  />

                </View>
              </View>

              <View
                accessibilityLabel={`Time option ${index + 1}`}
                style={{ borderColor: 'red',
                borderWidth: 1, width: '50%', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-end' }}
              >
                <View style={{ borderColor: 'red',
                borderWidth: 1, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                    <IconM name="clock" size={scale(24)} color={colours.when} />
                  </View>
                  <DatePicker
                    showIcon={false}
                    style={{ width: '70%', maxWidth: 300 }}
                    date={ data.time && data.time }
                    mode="time"
                    placeholder="select time"
                    format="HH:mm"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    minuteInterval={10}
                    customStyles={{
                      dateIcon: {

                      },
                      dateInput: {
                        marginLeft: 5,
                        borderWidth: 0,
                        borderBottomColor: colours.when,
                        borderBottomWidth: 2
                      }
                    }}
                    onDateChange={ (time) => {
                      this.setState({ tbcSwitch: false });
                      handleTime(time, index);
                    }}
                  />

                </View>

                <View style={{ borderColor: 'purple',
                borderWidth: 1, width: '100%', flexDirection: 'row', paddingLeft: 5, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={[styles.msg3, { borderColor: 'blue',
                  borderWidth: 1, width: '20%', fontSize: scale(12), textAlign: 'right' }]}>or</Text>
                  <View style={{ borderColor: 'blue',
                  borderWidth: 1, width: '40%', alignItems: 'center', justifyContent: 'center' }} >
                    <Switch
                      onValueChange={ (switchValue) => {
                        this.setState({ tbcSwitch: switchValue });
                        const newTimeValue = switchValue ? '' : moment().format('HH:mm');
                        handleTime(newTimeValue, index);
                      }}
                      value={ this.state.tbcSwitch }
                      style={{ padding: 0, margin: 0, transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                      // tintColor={colours.gray}
                      // thumbTintColor={colours.when}
                      onTintColor={colours.when}

                    />
                  </View>
                  <Text style={[styles.msg3, { color: this.state.tbcSwitch ? colours.when : colours.gray, borderColor: 'blue',
                  borderWidth: 1, width: '30%', fontSize: scale(12), textAlign: 'left' }]}>TBC</Text>
                </View>

              </View>

            </View>
          </View>
        </View>
        <View style={ [styles.shortRow, { borderColor: 'red',
        borderWidth: 1, width: '15%', alignItems: 'center', justifyContent: 'center' }] }>

          { (inputKey === 0) &&
            <View />
          }
          { (inputKey !== 0) &&
            <Button buttonStyle={[styles.smallButtonStyle, { justifyContent: 'center' }]} onPress={ () => removeInput(inputKey) }>
              <Icon name="times" size={16} color="gray" />
            </Button>
          }
        </View>

      </View>

    );
  }
}

export default DateTime;
