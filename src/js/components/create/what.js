/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../general/input';
// import Router from '../../router';
import AddInput from '../general/add-input';
import Button from '../common/Button';
import Header from '../common/Header';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import discardEvent from '../../lib/discard-event';

export default class What extends Component {

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
    this.props.navigation.navigate('Where', { name });
  }

  render () {
    const { data, name, addInput, removeInput, handleChange } = this.props;
    const inputCount = data.length;

    const inputs = data.map((value, i) => {
      return (
        <Input
          testDescription={`What option ${i + 1}`}
          style={styles.inputStyle}
          handleChange={ handleChange }
          key={ i }
          inputCount={ inputCount }
          value={ value }
          inputKey={ i }
          removeInput={ removeInput }
          placeholder="What would you like to do?"
        />
      );
    });

    return (
      <View
        style={[
          styles.headerBuffer,
          { backgroundColor: colours.white }]}
      >
        <Header style={{ marginTop: Platform.OS === 'ios' ? null : 70 }} />
        <KeyboardAwareScrollView
          style={{ backgroundColor: colours.transparent, marginTop: Platform.OS === 'ios' ? null : 90 }}
          enableOnAndroid
          extraHeight={0}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ }}
        >

          <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 70, marginHorizontal: 15 }}>
            <Text style={ [styles.msg4, { paddingTop: 10, paddingBottom: 10 }] }>
              Enter what your event will be (or leave blank to decide it later).
            </Text>
            <Text style={ [styles.msg4, { paddingTop: 10, paddingBottom: 10 }] }>
              You can add more than one option to create a poll.
            </Text>

            { inputs }

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
                paddingLeft: 5,
                paddingRight: 5 }}
            >
              <AddInput testDescription="Add What option" data={ data } handler={ addInput } />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 0,
                marginBottom: 10,
                paddingLeft: 5,
                paddingRight: 5 }}
            >
              <Button
                testDescription="Confirm What"
                onPress={ () => this.nextPage(name) }
                buttonStyle={ [styles.buttonStyle, { flex: 1 }] }
                textStyle={ styles.buttonTextStyle }
              >
                Next
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
