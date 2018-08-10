/* eslint-disable react/prefer-stateless-function */
/* eslint-disable*/
import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PlacesAutoComplete extends Component {

  constructor () {
    super();
    this.state = {
      listViewDisplayed: 'auto',
      inputFocussed: false,
      inputKeyFocussed: -1
    };
  }
  componentWillMount () {
    console.log('mount where');
    this.setState({ listViewDisplayed: 'auto', inputFocussed: false, inputKeyFocussed: -1 });
    this.forceUpdate();
  }

  onPlaceSearch = (data, details, i) => {

    const place = details.website ? `${details.name} ${details.formatted_address}` : `${details.formatted_address}`;
    this.setState({ inputFocussed: false, inputKeyFocussed: -1 }); // clears listview and unhides Where text,etc
    this.props.handleChange(place, i);
  }

  checkForData () {
    setTimeout(() => {
      const results = this.googlePlaces._results.length;
      if (!this.state.listViewDisplayed && results > 0) {
        this.setState({ listViewDisplayed: 'auto' });
      }
      if (this.state.listViewDisplayed && results === 0) {
        this.setState({
          listViewDisplayed: false
        });
      }
    }, 1000);
  }

  render () {

    const { inputKey, inputFocussed, inputKeyFocussed } = this.props;

    return (
      <GooglePlacesAutocomplete
        ref={ (googlePlaces) => {
          this.googlePlaces = googlePlaces;
        }}
        enablePoweredByContainer
        keyboardShouldPersistTaps="handled"
        placeholder="Enter a venue"
        minLength={2}
        autoFocus={false}
        fetchDetails
        listViewDisplayed={inputFocussed && inputKeyFocussed === inputKey}
        textInputProps={{
          returnKeyType: 'done',
          underlineColorAndroid: 'white',
          onKeyPress: (e) => { // IOS only
            if (e.nativeEvent.key === 'Enter') {
              this.setState({ listViewDisplayed: 'false', inputFocussed: false, inputKeyFocussed: -1 });
            }
          },
          onChangeText: (text) => {
            this.checkForData();
            this.props.handleChange(text, inputKey);
          },
          onFocus: () => {
            this.setState({ inputFocussed: true, inputKeyFocussed: inputKey });
          },
          onSubmitEditing: () => {
            // when IOS return key is pressed
            this.setState({ inputKeyFocussed: -1, inputFocussed: false }); // check IOS inputFocussed not causing bugs
          },
          onEndEditing: () => {
            // when textinput loses focus, NOT when item in list is clicked

            console.log('onEndEditing: ');
            if (Platform === 'IOS') {
              this.setState({ inputFocussed: false, inputKeyFocussed: -1 });
            }

          }
        }}
        onPress={(searchData, details, index = inputKey) => this.onPlaceSearch(searchData, details, index)}
        query={{
          types: ['establishment', 'geocode'],
          key: Config.GOOGLE_PLACES_API_KEY,
          language: 'en'
        }}
        getDefaultValue={() => value }
        renderLeftButton={() => {
          return (
            inputKey === this.state.inputKeyFocussed && this.state.inputFocussed &&
            <View style={{ marginLeft: 5 }}><Icon
              name="search"
              size={18}
              color={colours.verylightgray}
              style={{ }}
              onPress={{}}
            /></View>
          );
        }}
        renderRightButton={() => {

          return (
            inputKey === this.state.inputKeyFocussed && this.state.inputFocussed &&
            <View style={{ marginRight: 5 }}><Icon
              name="chevron-down"
              size={18}
              color={colours.verylightgray}
              style={{ }}
              onPress={() => {
                this.setState({ inputKeyFocussed: -1, inputFocussed: false });
                // check IOS inputFocussed not causing bugs
              }}
            /></View>
          );
        }}
        styles={{
          container: {
            flex: !this.state.inputFocussed ? 10 : 1,
            borderRadius: 5
            // borderColor: 'yellow',
            // borderWidth: 1
            // backgroundColor: 'purple' // '#fff'
            // zIndex: 999999
          },
          textInputContainer: {
            backgroundColor: inputKey === this.state.inputKeyFocussed && this.state.inputFocussed ? colours.where : colours.white,
            flex: this.state.listViewDisplayed ? null : 1,
            height: 44,
            alignItems: 'center',
            borderRadius: 7,
            borderTopColor: 'transparent', // remove default styling
            borderTopWidth: 0, // remove default styling
            borderBottomColor: 'transparent', // remove default styling
            borderBottomWidth: 0 // remove default styling
            // maxWidth: !this.state.inputFocussed ? windowSize.width - (windowSize.width / 4) : null
          },
          textInput: {
            height: 34,
            marginTop: 4,
            marginBottom: 4,
            flex: 1,
            borderColor: inputKey === this.state.inputKeyFocussed && this.state.inputFocussed ? colours.where : colours.where,
            borderWidth: 1,
            borderRadius: inputKey === this.state.inputKeyFocussed && this.state.inputFocussed ? 10 : 5
          },
          listView: {
            // height: deviceHeight,
            // ios - position: 'absolute',
            // left: 5,
            // right: 5,
            // top: 10, // 40
            backgroundColor: colours.verylightgray
            // flex: 1
          }
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
      />
    );
  }
}
