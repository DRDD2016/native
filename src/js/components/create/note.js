import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import HeaderBack from '../common/CreateHeaderBackground';
import ButtonHeader from '../common/ButtonHeader';
import InputField from '../general/inputField';
import BannerBar from '../common/BannerBar';
import BackIcon from '../common/back-icon';
import styles, { TitleCreate, HeaderText, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';
import CloseButton from '../common/CloseButton';

export default class Note extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' }, // workaround to remove padding at top of header
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
      <View style={{ backgroundColor: colours.white }}>
        <BannerBar />
        <KeyboardAwareScrollView
          style={{ backgroundColor: colours.white, height: Dimensions.get('window').height * 2 }}
          enableOnAndroid
          extraHeight={125}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ }}
        >

          <View
            style={{ backgroundColor: colours.transparent }}
          >
            <View style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 15 }}>
              <TitleCreate color={colours.what} >
                Do you want to add a message to your friends?
              </TitleCreate>
              <Text style={ [styles.msg3, { paddingTop: 10, paddingBottom: 10 }] }>
                (optional)
              </Text>

              <View style={ styles.row }>
                <InputField
                  accessibilityLabel="Note"
                  underlineColorAndroid="transparent"
                  style={ [styles.inputStyle, { textAlignVertical: 'top', height: 400 }] }
                  onChangeText={ text => handleChange(text, 'note') }
                  value={ note }
                  type="text"
                  placeholder="eg. Meet in the bar, bring salad, dress code, etc"
                  inputKey={0}
                  label="Your message"
                  showLabel
                  // optional
                  multiline
                  numberOfLines={5}
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
      </View>
    );
  }
}
