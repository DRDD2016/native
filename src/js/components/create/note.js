import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../common/Button';
import ImageHeader from '../common/ImageHeader';
import HeaderBack from '../common/CreateHeaderBackground';
import ButtonHeader from '../common/ButtonHeader';
import BackIcon from '../common/back-icon';
import styles from '../../../styles';
import colours from '../../../styles/colours';

export default class Note extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Add Message',
    headerLeft: <ButtonHeader
      onPress={() => navigation.goBack(null)}
    >
      <BackIcon />
    </ButtonHeader>,
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  });

  nextPage = (name) => {
    this.props.navigation.navigate('Confirm', { name });
  };

  render () {
    const { name, note, handleChange } = this.props;

    const hideNext = note === '';

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: colours.white, height: Dimensions.get('window').height * 2 }}
        enableOnAndroid
        extraHeight={125}
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
              Add a message to your friends (optional).
            </Text>

            <View style={ styles.row }>
              <TextInput
                accessibilityLabel="Note"
                underlineColorAndroid="transparent"
                style={ [styles.inputStyle, { textAlignVertical: 'top', height: 100 }] }
                onChangeText={ text => handleChange(text, 'note') }
                value={ note }
                multiline
                numberOfLines={5}
                placeholder="Enter your message here"
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
