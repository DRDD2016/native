import React, { Component } from 'react';
import { View, Text, DatePickerIOS, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Router from '../../router';
import AddInput from '../general/add-input';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const inlineStyle = {
  dateContainer: {
    height: 200
  },
  timeContainer: {
    height: 200
  },
  timeContainerHidden: {
    height: 0,
    overflow: 'hidden'
  },
  dateContainerHidden: {
    height: 0,
    overflow: 'hidden'
  }
};

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

  constructor (props) {
    super(props);

    this.state = {
      expandedTime: false,
      expandedDate: false
    };

    this.toggleTime = this.toggleTime.bind(this);
    this.toggleDate = this.toggleDate.bind(this);
  }

  toggleTime () {
    this.setState({
      expandedTime: !this.state.expandedTime
    });
  }

  toggleDate () {
    this.setState({
      expandedDate: !this.state.expandedDate
    });
  }

  nextPage = (name) => {
    this.props.navigator.push(Router.getRoute('confirm', { name }));
  };

  render () {
    const { name, data, addInput, removeInput, handleDate, handleTime } = this.props;
    const inputs = data.map((value, i) => {
      return (
        <View key={ i }>

          <View key={ 100 } style={{ margin: 10 }}>
            <Icon.Button name={ this.state.expandedDate ? 'window-close' : 'calendar'} backgroundColor="#3b5998" onPress={this.toggleDate}>
              Pick the date
            </Icon.Button>
          </View>

          <View key={ i } style={ this.state.expandedDate ? inlineStyle.dateContainer : inlineStyle.dateContainerHidden }>
            <DatePickerIOS
              date={ value.date }
              mode="date"
              onDateChange={ date => handleDate(date, i) }
            />
          </View>

          <View key={ value.date } style={{ margin: 10 }}>
            <Icon.Button name={ this.state.expandedTime ? 'window-close' : 'clock-o'} backgroundColor="#3b5998" onPress={this.toggleTime}>
              Pick the time
            </Icon.Button>
          </View>

          <View key={ 4 } style={ this.state.expandedTime ? inlineStyle.timeContainer : inlineStyle.timeContainerHidden }>
            <DatePickerIOS
              date={ value.time }
              mode="time"
              onDateChange={ time => handleTime(time, i) }
              minuteInterval={ 10 }
            />
          </View>

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
