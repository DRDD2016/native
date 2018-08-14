/* eslint-disable react/prefer-stateless-function */
import Config from 'react-native-config';
import React, { Component } from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../../../styles/colours';

export default class PlaceAutoComplete extends Component {

  constructor () {
    super();

    this.state = {
      listViewDisplayed: 'auto'
      // inputFocussed: false
    };
  }
  componentWillMount () {
    const { inputKey } = this.props;
    console.log(`inputKey ${inputKey} autocomplete mounted`);
    // this.forceUpdate();
  }


  onPlaceSearch = (data, details, i) => {
    const { onLostFocus } = this.props;
    const place = details.website ? `${details.name} ${details.formatted_address}` : `${details.formatted_address}`;
    // this.setState({ inputFocussed: false }); // clears listview and unhides Where text,etc
    console.log('onPlaceSearch');
    console.log('data:', data);
    console.log('details:', details);
    this.props.handleChange(place, i);
    onLostFocus();
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

    const { inputKey, inputKeyFocussed, inputFocussed, value, onFocus, onLostFocus } = this.props;
    console.log(`inputKey ${inputKey} autocomplete render, listViewDisplayed ${this.state.listViewDisplayed}, inputFocussed ${inputFocussed}, inputKeyFocussed ${inputKeyFocussed}, value ${value}`); // eslint-disable-line max-len

    // if (inputFocussed === false) {
    //   console.log('inputsNOTFocussed');
    //   return (
    //     <View
    //       accessibilityLabel={`Where option ${inputKey + 1}`}
    //       key={ inputKey }
    //     />
    //   );
    // }

    return (
      <View style={{ flex: 1 }}>

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
                console.log('Enter key pressed: ');
                this.setState({ listViewDisplayed: 'false'
                // , inputFocussed: false
                });
                onLostFocus();
              }
            },
            onChangeText: (text) => {
              this.checkForData();
              this.props.handleChange(text, inputKey);
            },
            onFocus: () => {
              console.log('onFocus');
              // this.setState({ inputFocussed: true });
              onFocus(inputKey);
            },
            onSubmitEditing: () => {
              // when IOS return key is pressed
              console.log('onSubmitEditing: ');
              this.setState({ listViewDisplayed: 'false' });
              onLostFocus();
              // this.setState({ inputFocussed: false }); // check IOS inputFocussed not causing bugs
            },
            onEndEditing: () => {
              // when textinput loses focus, NOT when item in list is clicked
              // code here overrides onPress Code

              console.log('onEndEditing: ');
              // this.setState({ listViewDisplayed: 'false' });
              // onLostFocus();

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
              inputFocussed &&
              <View style={{ marginLeft: 5 }}><Icon
                name="chevron-left"
                size={18}
                color={colours.verylightgray}
                style={{ }}
                onPress={() => {
                  onLostFocus();
                  // check IOS inputFocussed not causing bugs
                }}
              /></View>
            );
          }}
          renderRightButton={() => {

            return (
              inputFocussed &&
              <View style={{ marginRight: 5 }}><Icon
                name="search"
                size={18}
                color={colours.verylightgray}
                style={{ }}
                onPress={() => {}}
              /></View>
            );

          }}
          styles={{
            container: {
              flex: !inputFocussed ? 10 : 1,
              borderRadius: 5
              // borderColor: 'red',
              // borderWidth: 1
              // visible: inputKeyFocussed === inputKey
              // width: 200
              // backgroundColor: 'purple' // '#fff'
              // zIndex: 999999
            },
            textInputContainer: {
              backgroundColor: inputFocussed ? colours.where : colours.white,
              flex: this.state.listViewDisplayed ? null : 1,
              // height: 44,
              alignItems: 'center',
              borderRadius: 7,
              borderTopColor: 'transparent', // remove default styling
              borderTopWidth: 0, // remove default styling
              borderBottomColor: 'transparent', // remove default styling
              borderBottomWidth: 0 // remove default styling
              // maxWidth: !this.state.inputFocussed ? windowSize.width - (windowSize.width / 4) : null
            },
            textInput: {
              height: 40,
              marginTop: 4,
              marginBottom: 4,
              flex: 1,
              borderColor: inputFocussed ? colours.where : colours.where,
              borderWidth: 1,
              borderRadius: inputFocussed ? 10 : 5
            },
            listView: {
              // height: deviceHeight,
              // ios - position: 'absolute',
              // left: 5,
              // right: 5,
              // top: 10, // 40
              backgroundColor: colours.verylightgray,
              flex: 1,
              height: inputFocussed ? null : 0
              // flex: 1
            }
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        />
      </View>

    );
  }
}
