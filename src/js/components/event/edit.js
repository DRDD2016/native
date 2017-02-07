import React from 'react';
import { View, TextInput, DatePickerIOS, ScrollView } from 'react-native';
import styles from '../../../styles';
import Button from '../common/Button';

export default function Edit ({ event, handleDetailsChange, handleWhatChange,
  handleWhereChange, handleDateChange, handleTimeChange, handleEditEvent }) {
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
        </View>
        <View style={{ height: 200 }}>
          <DatePickerIOS
            date={ when[0].date.toDate() }
            mode="date"
            onDateChange={ date => handleDateChange(date, 0) }
          />
        </View>
        <View style={{ height: 200 }}>
          <DatePickerIOS
            date={ when[0].time.toDate() }
            mode="time"
            onDateChange={ time => handleTimeChange(time, 0) }
            minuteInterval={ 10 }
          />
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
