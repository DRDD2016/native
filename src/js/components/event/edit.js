import React, { Component } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import Button from '../common/Button';

export default class Edit extends Component {

  static route = {
    navigationBar: {
      title: 'Edit event',
      backgroundColor: colours.blue,
      tintColor: colours.white
    }
  }

  render () {
    const { event, handleDetailsChange, handleWhatChange,
      handleWhereChange, handleDateChange, handleEditEvent } = this.props;
    const { name, description, note, what, where, when } = event;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={ styles.container }>
            <View style={ styles.row }>
              <TextInput
                style={ styles.inputStyle }
                onChangeText={ text => handleDetailsChange(text, 'name') }
                value={ name }
                type="text"
                placeholder="Event name"
                autoCorrect
              />
            </View>
            <View style={ styles.row }>
              <TextInput
                style={ styles.inputStyle }
                onChangeText={ text => handleDetailsChange(text, 'description') }
                value={ description }
                type="text"
                placeholder="Event description"
                autoCorrect
              />
            </View>
            <View style={ styles.row }>
              <TextInput
                style={ styles.inputStyle }
                onChangeText={ text => handleDetailsChange(text, 'note') }
                value={ note }
                placeholder="Leave a note to your friends (optional)"
                autoCorrect
              />
            </View>
            <View style={ styles.row }>
              <TextInput
                style={styles.inputStyle}
                onChangeText={ text => handleWhatChange(text, 0) }
                value={ what[0] }
                placeholder="What would you like to do?"
              />
            </View>
            <View style={ styles.row }>
              <TextInput
                style={styles.inputStyle}
                onChangeText={ text => handleWhereChange(text, 0) }
                value={ where[0] }
                placeholder="What would you like to do?"
              />
            </View>
            <View>
              <DatePicker
                style={{ width: 200 }}
                date={ when[0].date }
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
                onDateChange={date => handleDateChange(date, 0)}
              />
            </View>
          </View>

          <View>
            <Button
              buttonStyle={styles.buttonStyle}
              onPress={ () => handleEditEvent(event) }
            >
              Update
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }

}
