/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MultipleInput from '../general/multipleInput';
import BannerBar from '../common/BannerBar';
// import Router from '../../router';
import AddInput from '../general/add-input';
import ButtonHeader from '../common/ButtonHeader';
// import HeaderBack from '../common/CreateHeaderBackground';
import styles, { TitleCreate, HeaderText, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';
// import discardEvent from '../../lib/discard-event';
import BackIcon from '../common/back-icon';
import CloseButton from '../common/CloseButton';

export default class What extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' }, // workaround to remove padding at top of header
    headerLeft: <ButtonHeader
      onPress={() => navigation.goBack(null)}
    >
      <BackIcon />
    </ButtonHeader>,
    headerRight: <CloseButton stack="ScreenCreate" nav={navigation} />,
    headerStyle: { backgroundColor: colours.headerBackgroundColor, elevation: 0 },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <HeaderText>{navigation.state.params.name}</HeaderText>
    </View>
  });

  nextPage = (name) => {
    this.props.navigation.navigate('Where', { name });
  }

  render () {
    const { data, name, addInput, removeInput, handleChange } = this.props;
    const inputCount = data.length;
    const labelType = data.length > 1 ? 'poll' : 'notPoll';
    console.log('inputCount', inputCount);
    console.log('showLabel', labelType);

    const inputs = data.map((value, i) => {
      console.log('i', i);
      const labelText = 'Activity';
      console.log('labelText', labelText);
      console.log('showLabel2', labelType);

      return (
        <MultipleInput
          testDescription={`What option ${i + 1}`}
          style={ styles.inputStyle } // is this used?
          handleChange={ handleChange }
          key={ i }
          inputCount={ inputCount }
          value={ value }
          inputKey={ i }
          labelType={labelType}
          labelText={labelText}
          removeInput={ removeInput }
          placeholder="eg. lunch, drinks, bowling, paintballing, etc "
          focussedColor={colours.what}
          unfocussedColor={colours.lightgray}
        />
      );
    });

    return (
      <View style={{ borderBottomWidth: 8, borderBottomColor: colours.what, backgroundColor: colours.white, flex: 1 }}>
        <BannerBar />
        <KeyboardAwareScrollView
          style={{ backgroundColor: colours.white }}
          enableOnAndroid
          extraHeight={80}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ }}
        >

          <View
            style={{ backgroundColor: colours.transparent }}
          >

            <View style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 15 }}>
              <TitleCreate color={colours.what} >
                What do you want to do?
              </TitleCreate>
              <Text style={ [styles.msg4, { paddingTop: 10, paddingBottom: 10 }] }>
                eg. lunch, drinks, bowling, go-karting (or leave blank to decide it later)
              </Text>

              { inputs }

              <Text style={ [styles.msg4, { paddingTop: 10, paddingBottom: 10 }] }>
                You can add more than one option to create a poll.
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginBottom: 10,
                  paddingLeft: 5,
                  paddingRight: 5 }}
              >
                <AddInput testDescription="Add What option" colour={colours.what} data={ data } handler={ addInput } />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 0,
                  marginBottom: 10,
                  paddingLeft: 5,
                  paddingRight: 5 }}
              >
                <ConfirmButton
                  testDescription="Confirm What"
                  onPress={ () => this.nextPage(name) }
                  style={{ backgroundColor: colours.green }}
                >
                  <ConfirmButtonText>
                    NEXT
                  </ConfirmButtonText>

                </ConfirmButton>

              </View>
              <View style={{ height: 80 }} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
