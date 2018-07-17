import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderBack from '../common/CreateHeaderBackground';
import ButtonHeader from '../common/ButtonHeader';
import BackIcon from '../common/back-icon';
import styles, { HeaderText, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';
import CloseButton from '../common/CloseButton';

export default class Note extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ButtonHeader
      onPress={() => navigation.goBack(null)}
    >
      <BackIcon />
    </ButtonHeader>,
    headerRight: <CloseButton stack="ScreenCreate" nav={navigation} />,
    headerStyle: { borderTopWidth: 4, borderTopColor: colours.main, backgroundColor: colours.headerBackgroundColor, elevation: 0 },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <HeaderText>Add Message</HeaderText>
    </View>
  });

  nextPage = (name) => {
    this.props.navigation.navigate('Confirm', { name });
  };

  render () {
    const { name, note, handleChange } = this.props;

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

              <ConfirmButton
                testDescription="Confirm Event Note"
                onPress={ () => this.nextPage(name) }
                style={{ backgroundColor: colours.green }}
              >

                <ConfirmButtonText>
                  NEXT
                </ConfirmButtonText>

              </ConfirmButton>

            </View>
            <View style={{ height: 60 }} />
          </View>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}
