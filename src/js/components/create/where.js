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
import PlaceAutoComplete from '../common/PlaceAutoComplete';
import CloseButton from '../common/CloseButton';
import HeaderBack from '../common/CreateHeaderBackground';
import styles, { HeaderText, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';

// const windowSize = Dimensions.get('window');

export default class Where extends Component {

  static navigationOptions = ({ navigation }) => ({
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
    const inputs = data.map((value, inputKey) => {
      // console.log('data: ', data);
      // console.log('name: ', name);
      console.log('where map inputKey: ', inputKey);
      console.log(`value for ${inputKey}: `, value);
      // console.log('this.state.inputFocussed: ', this.state.inputFocussed);
      // console.log('this.state.inputKeyFocussed: ', this.state.inputKeyFocussed);
      // console.log('this.state.listViewDisplayed: ', this.state.listViewDisplayed);

      // if (this.state.inputFocussed !== false && inputKey !== this.state.inputKeyFocussed && this.state.inputKeyFocussed !== '') {
      //   // console.log('inputsNOTFocussed');
      //   return (
      //     <View
      //       accessibilityLabel={`Where option ${inputKey + 1}`}
      //       key={ inputKey }
      //     />
      //   );
      // }

      if (this.state.inputFocussed && this.state.inputKeyFocussed !== inputKey) {
        return null;
      }

      return (

        <View
          accessibilityLabel={`Where option ${inputKey + 1}`}
          key={ inputKey }
          style={{
            flexDirection: 'row',
            flex: 1,
            // height: 44,
            // borderColor: 'yellow',
            // borderWidth: 1,
            marginTop: !this.state.inputFocussed ? 10 : null,
            paddingHorizontal: !this.state.inputFocussed ? 10 : null // #fff
            // zIndex: 999999
          }}
        >
          <View style={{
            flexDirection: 'row',
            flex: 1
            // borderColor: 'blue',
            // borderWidth: 2
          }}
          >
            <PlaceAutoComplete
              inputKey={ inputKey }
              value={ value }
              onFocus={() => this.setInputKeyFocussed(inputKey)}
              onLostFocus={() => this.setLostFocus()}
              inputKeyFocussed={this.state.inputKeyFocussed}
              inputFocussed={this.state.inputFocussed}
              handleChange={(place, i) => this.props.handleChange(place, i)}
              // ref={ (googlePlaces) => {
              //   this.googlePlaces = googlePlaces;
              // }}
              // listViewDisplayed={this.state.inputFocussed && this.state.inputKeyFocussed === inputKey}
              // textInputProps={{
              //   returnKeyType: 'done',
              //   underlineColorAndroid: 'white',
              //   onKeyPress: (e) => { // IOS only
              //     if (e.nativeEvent.key === 'Enter') {
              //       this.setState({ inputFocussed: false, inputKeyFocussed: -1 });
              //     }
              //   },
              //   onChangeText: (text) => {
              //     this.checkForData();
              //     this.props.handleChange(text, inputKey);
              //   },
              //   onFocus: () => {
              //     this.setState({ inputFocussed: true, inputKeyFocussed: inputKey });
              //   },
              //   onSubmitEditing: () => {
              //     // when IOS return key is pressed
              //     this.setState({ inputKeyFocussed: -1, inputFocussed: false }); // check IOS inputFocussed not causing bugs
              //   },
              //   onEndEditing: () => {
              //     // when textinput loses focus, NOT when item in list is clicked
              //
              //     console.log('onEndEditing: ');
              //     if (Platform === 'IOS') {
              //       this.setState({ inputFocussed: false, inputKeyFocussed: -1 });
              //     }
              //
              //   }
              // }}
              // onPress={(searchData, details, index = inputKey) => this.onPlaceSearch(searchData, details, index)}
              // query={{
              //   types: ['establishment', 'geocode'],
              //   key: Config.GOOGLE_PLACES_API_KEY,
              //   language: 'en'
              // }}
              // getDefaultValue={() => value }
              // renderLeftButton={() => {
              //   return (
              //     inputKey === this.state.inputKeyFocussed && this.state.inputFocussed &&
              //     <View style={{ marginLeft: 5 }}><Icon
              //       name="search"
              //       size={18}
              //       color={colours.verylightgray}
              //       style={{ }}
              //       onPress={{}}
              //     /></View>
              //   );
              // }}
              // renderRightButton={() => {
              //
              //   return (
              //     inputKey === this.state.inputKeyFocussed && this.state.inputFocussed &&
              //     <View style={{ marginRight: 5 }}><Icon
              //       name="chevron-down"
              //       size={18}
              //       color={colours.verylightgray}
              //       style={{ }}
              //       onPress={() => {
              //         this.setState({ inputKeyFocussed: -1, inputFocussed: false });
              //         // check IOS inputFocussed not causing bugs
              //       }}
              //     /></View>
              //   );
              // }}
              // styles={{
              //   container: {
              //     flex: !this.state.inputFocussed ? 10 : 1,
              //     borderRadius: 5
              //     // borderColor: 'yellow',
              //     // borderWidth: 1
              //     // backgroundColor: 'purple' // '#fff'
              //     // zIndex: 999999
              //   },
              //   textInputContainer: {
              //     backgroundColor: inputKey === this.state.inputKeyFocussed && this.state.inputFocussed ? colours.where : colours.white,
              //     flex: this.state.listViewDisplayed ? null : 1,
              //     height: 44,
              //     alignItems: 'center',
              //     borderRadius: 7,
              //     borderTopColor: 'transparent', // remove default styling
              //     borderTopWidth: 0, // remove default styling
              //     borderBottomColor: 'transparent', // remove default styling
              //     borderBottomWidth: 0 // remove default styling
              //     // maxWidth: !this.state.inputFocussed ? windowSize.width - (windowSize.width / 4) : null
              //   },
              //   textInput: {
              //     height: 34,
              //     marginTop: 4,
              //     marginBottom: 4,
              //     flex: 1,
              //     borderColor: inputKey === this.state.inputKeyFocussed && this.state.inputFocussed ? colours.where : colours.where,
              //     borderWidth: 1,
              //     borderRadius: inputKey === this.state.inputKeyFocussed && this.state.inputFocussed ? 10 : 5
              //   },
              //   listView: {
              //     // height: deviceHeight,
              //     // ios - position: 'absolute',
              //     // left: 5,
              //     // right: 5,
              //     // top: 10, // 40
              //     backgroundColor: colours.verylightgray
              //     // flex: 1
              //   }
              // }}
              // nearbyPlacesAPI="GooglePlacesSearch"
              // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
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
        {
          !this.state.inputFocussed && <HeaderBack />
        }
        <KeyboardAwareScrollView
          style={{ backgroundColor: colours.transparent }}
          enableOnAndroid
          extraHeight={0}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ }}
          keyboardShouldPersistTaps="always"
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
              <View>
                <Text style={ styles.smallMessageText } >
                  Enter where the event will take place (or leave blank to decide it later).
                </Text>
                <Text style={ styles.smallMessageText }>
                  You can add more than one option to create a poll.
                </Text>
              </View>

            }

            { inputs }

            {
              !this.state.inputFocussed &&

              <View>

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
