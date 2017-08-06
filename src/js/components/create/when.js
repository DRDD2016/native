import React, { Component } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import AddInput from '../general/add-input';
import Button from '../common/Button';
import Header from '../common/Header';
import DateTime from '../common/date-time';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import discardEvent from '../../lib/discard-event';

export default class When extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerRight: () => {
      return (
        <Button
          onPress={ discardEvent }
          buttonStyle={{ margin: 15 }}
          textStyle={{ color: colours.white, fontWeight: '600' }}
        >
          <Text>Cancel</Text>
        </Button>
      );
    },
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor
  });

  nextPage = (name) => {
    this.props.navigation.navigate('Confirm', { name });
  };

  render () {
    const { name, data, addInput, handleDate, handleTime, removeInput } = this.props;


    const hideNext = data[0].date === '';

    return (
      <View
        style={[
          styles.headerBuffer,
          { backgroundColor: colours.white }]}
      >
        <Header style={{ marginTop: Platform.OS === 'ios' ? null : 70 }} />
        <ScrollView style={{ marginTop: 80 }} >
          <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 70, marginHorizontal: 15 }}>

            <Text style={[styles.msg4, { backgroundColor: colours.transparent, paddingTop: 10, paddingBottom: 10 }]}>
              Enter a date and a time for your event.  Dates are required, but you can leave the time as TBC.
            </Text>
            <Text style={[styles.msg4, { backgroundColor: colours.transparent, paddingTop: 10, paddingBottom: 10 }]}>
              You can add more than one option to create a poll.
            </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            {
              data.map((datum, i) => {
                return (
                  <DateTime
                    data={datum}
                    handleDate={handleDate}
                    handleTime={handleTime}
                    removeInput={removeInput}
                    index={i}
                    key={Math.random()}
                  />
                );
              })
            }
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
                paddingLeft: 5,
                paddingRight: 5 }}
            >
              <AddInput data={ data } handler={ addInput } />
            </View>
          </View>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 0,
                marginBottom: 10,
                paddingLeft: 5,
                paddingRight: 5 }}
            >
              { (hideNext) &&
                <View />
              }
              { (!hideNext) &&
                <Button
                  testDescription="Confirm When"
                  buttonStyle={ [styles.buttonStyle, { flex: 1 }] }
                  textStyle={ styles.buttonTextStyle }
                  onPress={ () => this.nextPage(name) }
                >
                  Next
                </Button>
              }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
