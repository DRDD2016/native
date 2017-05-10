import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../common/Button';
import Header from '../common/Header';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import { store } from '../../init-store';
import { clearCreateEvent } from '../../actions/create';
import discardEvent from '../../lib/discard-event';

export default class Details extends Component {

  static navigationOptions = {
    title: 'Create event',
    headerRight: () => {
      return (
        <Button
          onPress={ discardEvent }
          buttonStyle={{ margin: 15, justifyContent: 'center' }}
          textStyle={{ color: colours.darkgray, fontWeight: '600' }}
        >
          <Icon
            name="close"
            style={{ paddingLeft: 15, paddingRight: 15 }}
            size={ 24 }
            color={ colours.darkgray }
          />
        </Button>
      );
    }
  }

  componentWillMount () {
    store.dispatch(clearCreateEvent());
  }

  nextPage = (name) => {
    this.props.navigation.navigate('What', { name });
  }

  render () {
    const { name, description, note, handleChange } = this.props;
    const hideNext = name === '' || description === '';
    return (
      <View style={{ flex: 1, backgroundColor: colours.white }}>
        <Header />
        <KeyboardAwareScrollView
          style={{ backgroundColor: colours.transparent }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
        >
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 10,
              marginTop: 70 }}
          >
            <Text style={styles.msg3}>
              Enter the name of your event and a description.
            </Text>

            <View style={ styles.row }>
              <TextInput
                underlineColorAndroid="transparent"
                style={ styles.inputStyle }
                onChangeText={ text => handleChange(text, 'name') }
                value={ name }
                type="text"
                placeholder="Event name"
                autoCorrect
              />
            </View>
            <View style={ styles.row }>
              <TextInput
                underlineColorAndroid="transparent"
                style={ styles.inputStyle }
                onChangeText={ text => handleChange(text, 'description') }
                value={ description }
                type="text"
                placeholder="Event description"
                autoCorrect
              />
            </View>
            <View style={ styles.row }>
              <TextInput
                underlineColorAndroid="transparent"
                style={ [styles.inputStyle, { height: 100 }] }
                onChangeText={ text => handleChange(text, 'note') }
                value={ note }
                multiline
                numberOfLines={5}
                placeholder="Leave a note to your friends (optional)"
                autoCorrect
              />
            </View>
            <View style={ styles.row }>
              { (hideNext) &&
                <View />
              }
              { (!hideNext) &&
                <Button
                  onPress={ () => this.nextPage(name) }
                  buttonStyle={[styles.buttonStyle, { flex: 1 }]}
                  textStyle={ styles.buttonTextStyle }
                >
                  Next
                </Button>
              }
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
