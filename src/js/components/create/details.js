import React, { Component } from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import Fabric from 'react-native-fabric';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../common/Button';
import ButtonHeader from '../common/ButtonHeader';
import ImageHeader from '../common/ImageHeader';
import HeaderBack from '../common/CreateHeaderBackground';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import { store } from '../../init-store';
import { clearCreateEvent } from '../../actions/create';
import BackIcon from '../common/back-icon';

const { Answers } = Fabric;

export default class Details extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Create event',
    headerLeft: <ButtonHeader onPress={() => navigation.goBack(null)}>
      <BackIcon />
    </ButtonHeader>,
    headerRight: <ButtonHeader />,
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  });

  componentWillMount () {
    store.dispatch(clearCreateEvent());
    console.log('this.props: ', this.props);

  }

  componentDidMount () {
    Answers.logCustom('Details.js Mounted', { additionalData: 'nothing' });
  }

  nextPage = (name) => {
    this.props.navigation.navigate('What', { name });
  }

  render () {
    console.log('render this.props: ', this.props);
    const { name, description, note, handleChange } = this.props;
    const hideNext = name === '' || description === '';
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: colours.white }}
        enableOnAndroid
        extraHeight={0}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ }}
      >
        <HeaderBack />
        <View
          style={{ backgroundColor: colours.transparent }}
        >
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 10,
              marginTop: Platform.OS === 'ios' ? null : 10 }}
          >
            <Text style={styles.msg3}>
              Enter the name of your event and a description.
            </Text>

            <View style={ styles.row }>
              <TextInput
                accessibilityLabel="Event name"
                underlineColorAndroid="transparent"
                style={ styles.inputStyle }
                onChangeText={ text => handleChange(text, 'name') }
                value={ name }
                type="text"
                placeholder="Event name"
                // autoCorrect
              />
            </View>
            <View style={ styles.row }>
              <TextInput
                accessibilityLabel="Event description"
                underlineColorAndroid="transparent"
                style={ styles.inputStyle }
                onChangeText={ text => handleChange(text, 'description') }
                value={ description }
                type="text"
                placeholder="Event description"
                // autoCorrect
              />
            </View>
            <View style={ styles.row }>
              <TextInput
                accessibilityLabel="Note"
                underlineColorAndroid="transparent"
                style={ [styles.inputStyle, { textAlignVertical: 'top', height: 120 }] }
                onChangeText={ text => handleChange(text, 'note') }
                value={ note }
                multiline
                numberOfLines={5}
                placeholder="Leave a note to your friends (optional)"
                // autoCorrect
              />
            </View>

            <View style={ styles.row }>
              { (hideNext) &&
                <View />
              }
              { (!hideNext) &&
                <Button
                  testDescription="Confirm Event Details"
                  onPress={ () => this.nextPage(name) }
                  buttonStyle={[styles.buttonStyle, { flex: 1 }]}
                  textStyle={ styles.buttonTextStyle }
                >
                  Next
                </Button>
              }
            </View>
            <View style={{ height: 60 }} />
          </View>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}
