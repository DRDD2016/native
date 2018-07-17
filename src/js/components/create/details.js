import React, { Component } from 'react';
import { View, Text, TextInput, Platform, Dimensions } from 'react-native';
import Fabric from 'react-native-fabric';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ButtonHeader from '../common/ButtonHeader';
import HeaderBack from '../common/CreateHeaderBackground';
import styles, { HeaderText, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';
import { store } from '../../init-store';
import { clearCreateEvent } from '../../actions/create';
import BackIcon from '../common/back-icon';

const { Answers } = Fabric;

export default class Details extends Component {

  static navigationOptions = ({ navigation }) => ({

    headerLeft: <ButtonHeader onPress={() => navigation.goBack(null)}>
      <BackIcon />
    </ButtonHeader>,
    headerRight: <ButtonHeader />,
    headerStyle: { borderTopWidth: 4, borderTopColor: colours.main, backgroundColor: colours.headerBackgroundColor, elevation: 0 },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <HeaderText> Create event </HeaderText>
    </View>
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
    const { name, description, handleChange } = this.props;
    const hideNext = name === '' || description === '';
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
              { (hideNext) &&
                <View />
              }
              { (!hideNext) &&
                <ConfirmButton
                  testDescription="Confirm Event Details"
                  onPress={ () => this.nextPage(name) }
                  style={{ backgroundColor: colours.green }}
                >
                  <ConfirmButtonText>
                    NEXT
                  </ConfirmButtonText>

                </ConfirmButton>

              }
            </View>
            <View style={{ height: 60 }} />
          </View>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}
