/* eslint-disable react/no-array-index-key */
// import Config from 'react-native-config';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Router from '../../router';
import AddInput from '../general/add-input';
import ButtonHeader from '../common/ButtonHeader';
import BackIcon from '../common/back-icon';
import BannerBar from '../common/BannerBar';
import PlaceAutoComplete from '../common/PlaceAutoComplete';
import CloseButton from '../common/CloseButton';
// import HeaderBack from '../common/CreateHeaderBackground';
import styles, { TitleCreate, HeaderText, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';

// const windowSize = Dimensions.get('window');

const inputCardStyle = {
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 15,
    minHeight: 32,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'darkgray',
    shadowOffset: { height: 2, width: 0 },
    flex: 1 // makes card expand to accomodate listView
};

export default class Where extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' }, // workaround to remove padding at top of header
    headerLeft: <ButtonHeader
      onPress={() => navigation.goBack(null)}
    >
      <BackIcon />
    </ButtonHeader>,
    headerRight: <CloseButton stack="ScreenCreate" nav={navigation} />,
    headerStyle: { borderTopWidth: 4, borderTopColor: colours.where, backgroundColor: colours.headerBackgroundColor, elevation: 0 },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <HeaderText>{navigation.state.params.name}</HeaderText>
    </View>
  });

  constructor () {
    super();
    this.state = {
      // listViewDisplayed: 'auto',
      inputFocussed: false,
      inputKeyFocussed: -1
    };
  }
  componentWillMount () {
    console.log('mount where');
    this.setState({ // listViewDisplayed: 'auto',
      inputFocussed: false, inputKeyFocussed: -1 });
    this.forceUpdate();
  }

  // onPlaceSearch = (data, details, i) => {
  //   console.log('onPlaceSearch where', `${data} ${details} ${i}`);
  //   const place = details.website ? `${details.name} ${details.formatted_address}` : `${details.formatted_address}`;
  //   this.setState({ inputFocussed: false, inputKeyFocussed: -1 }); // clears listview and unhides Where text,etc
  //   this.props.handleChange(place, i);
  // }

  setInputKeyFocussed = (inputKey) => {
    console.log('set inputKeyFocussed', inputKey);
    this.setState({ inputKeyFocussed: inputKey, inputFocussed: true });
  }

  setLostFocus = () => {
    console.log('set inputLostFocus');
    this.setState({ inputKeyFocussed: -1, inputFocussed: false });
    // if (Platform === 'IOS') {
    //   this.setState({ inputKeyFocussed: -1, inputFocussed: false });
    // }
    console.log('set inputLostFocus, this.state: ', this.state);
  }

  // checkForData () {
  //   setTimeout(() => {
  //     const results = this.googlePlaces._results.length;
  //     if (!this.state.listViewDisplayed && results > 0) {
  //       this.setState({ listViewDisplayed: 'auto' });
  //     }
  //     if (this.state.listViewDisplayed && results === 0) {
  //       this.setState({
  //         listViewDisplayed: false
  //       });
  //     }
  //   }, 1000);
  // }

  nextPage = (name) => {
    this.props.navigation.navigate('When', { name });
  }

  render () {
    const { data, name, addInput, removeInput } = this.props;
    const labelText = 'Place or venue';
    const labelType = data.length > 1 ? 'poll' : 'notPoll';
    const inputs = data.map((value, inputKey) => {

      console.log('where map inputKey: ', inputKey);
      console.log(`value for ${inputKey}: `, value);

      if (this.state.inputFocussed && this.state.inputKeyFocussed !== inputKey) {
        return null;
      }

      // <View
      //   accessibilityLabel={`Where option ${inputKey + 1}`}
      //   key={ inputKey }
      //   style={{
      //     flexDirection: 'row',
      //     flex: 1,
      //     // height: 44,
      //     // borderColor: 'yellow',
      //     // borderWidth: 1,
      //     marginTop: !this.state.inputFocussed ? 10 : null,
      //     paddingHorizontal: !this.state.inputFocussed ? 10 : null // #fff
      //     // zIndex: 999999
      //   }}
      return (
        <View
          accessibilityLabel={`Where option ${inputKey + 1}`}
          key={ inputKey }
          style={[inputCardStyle, {
            borderRadius: this.state.inputFocussed ? null : 10 }]}
        >


          <View style={{
            flexDirection: 'row',
            flex: 1,
            maxWidth: 700
            // borderColor: 'blue',
            // borderWidth: 2
          }}
          >
            <PlaceAutoComplete
              labelType={ labelType }
              labelText={ labelText }
              inputKey={ inputKey }
              value={ value }
              onFocus={() => this.setInputKeyFocussed(inputKey)}
              onLostFocus={() => this.setLostFocus()}
              inputKeyFocussed={this.state.inputKeyFocussed}
              inputFocussed={this.state.inputFocussed}
              handleChange={(place, i) => this.props.handleChange(place, i)}
            />
          </View>
          { inputKey !== 0 && inputKey !== this.state.inputKeyFocussed && !this.state.inputFocussed &&
            <View
              style={{ width: 30, flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}
            >
              <View>
                <Icon
                  name="remove"
                  size={18}
                  color="gray"
                  style={{ }}
                  onPress={ () => removeInput(inputKey) }
                />
              </View>
            </View>
          }
          {
            inputKey === 0 && inputKey !== this.state.inputKeyFocussed && !this.state.inputFocussed &&
            <View
              style={{ width: 30, paddingLeft: 5, justifyContent: 'center' }}
            />
          }
        </View>
      );
    });

    return (
      <View
        accessibilityLabel="Where"
        style={[
          { backgroundColor: colours.white, flex: 1 }]}
      >
        <BannerBar />
        {
          // !this.state.inputFocussed && <HeaderBack />
        }
        <KeyboardAwareScrollView
          style={{ backgroundColor: colours.transparent }}
          enableOnAndroid
          extraHeight={0}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ }}
          // keyboardShouldPersistTaps="always"
          keyboardShouldPersistTaps="handled"
        >
          <View
            accessibilityLabel="Where options"
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              margin: !this.state.inputFocussed ? 5 : null,
              marginHorizontal: !this.state.inputFocussed ? 10 : null }}
          >
            {
              !this.state.inputFocussed &&
              <View style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 15 }}>
                <TitleCreate color={colours.where} >
                  Where will it be?
                </TitleCreate>
                <Text style={ [styles.msg4, { paddingTop: 10, paddingBottom: 10 }] }>
                  Enter an city, town or address (or leave blank to decide it later)
                </Text>
              </View>

            }

            { inputs }

            {
              !this.state.inputFocussed &&

              <View style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 15 }}>
                <Text style={ [styles.msg4, { paddingTop: 10, paddingBottom: 10 }] }>
                  You can add more than one option to create a poll.
                </Text>
                <View
                  accessibilityLabel="Add Where"
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 10,
                    paddingLeft: 5,
                    paddingRight: 5 }}
                >
                  <AddInput testDescription="Add Where option" colour={colours.where} data={ data } handler={ addInput } />
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
                    testDescription="Confirm Where"
                    onPress={ () => this.nextPage(name) }
                    style={{ backgroundColor: colours.green }}
                  >

                    <ConfirmButtonText>
                      NEXT
                    </ConfirmButtonText>

                  </ConfirmButton>
                </View>
              </View>

            }
          </View>

        </KeyboardAwareScrollView>
      </View>
    );
  }
}
