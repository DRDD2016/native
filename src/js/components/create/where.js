/* eslint-disable react/no-array-index-key */
import Config from 'react-native-config';
import React, { Component } from 'react';
import { StatusBar, View, Text, Dimensions, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Router from '../../router';
import AddInput from '../general/add-input';
import ButtonHeader from '../common/ButtonHeader';
import BackIcon from '../common/back-icon';
import CloseButton from '../common/CloseButton';
import HeaderBack from '../common/CreateHeaderBackground';
import styles, { HeaderText, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';

const windowSize = Dimensions.get('window');

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

  nextPage = (name) => {
    this.props.navigation.navigate('When', { name });
  }

  render () {
    const { data, name, addInput, removeInput } = this.props;
    const inputs = data.map((value, inputKey) => {
      // console.log('data: ', data);
      // console.log('name: ', name);
      // console.log('inputKey: ', inputKey);
      // console.log('this.state.inputFocussed: ', this.state.inputFocussed);
      // console.log('this.state.inputKeyFocussed: ', this.state.inputKeyFocussed);
      // console.log('this.state.listViewDisplayed: ', this.state.listViewDisplayed);

      if (this.state.inputFocussed !== false && inputKey !== this.state.inputKeyFocussed && this.state.inputKeyFocussed !== '') {
        // console.log('inputsNOTFocussed');
        return (
          <View
            accessibilityLabel={`Where option ${inputKey + 1}`}
            key={ inputKey }
          />
        );
      }

      return (

        <View
          accessibilityLabel={`Where option ${inputKey + 1}`}
          key={ inputKey }
          style={{
            flexDirection: 'row',
            marginTop: !this.state.inputFocussed ? 10 : null,
            paddingHorizontal: !this.state.inputFocussed ? 10 : null // #fff
            // zIndex: 999999
          }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor={colours.where}
          />
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
            listViewDisplayed={this.state.inputFocussed && this.state.inputKeyFocussed === inputKey}
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
            styles={{
              container: {
                flex: !this.state.inputFocussed ? 10 : null,
                width: this.state.inputFocussed ? windowSize.width : null
                // borderRadius: 5
                // borderColor: colours.where
                // borderWidth: 1
                // backgroundColor: 'purple' // '#fff'
                // zIndex: 999999
              },
              textInputContainer: {
                backgroundColor: inputKey === this.state.inputKeyFocussed && this.state.inputFocussed ? colours.where : colours.white,
                height: 42,
                alignItems: 'center',
                borderRadius: 5,
                borderColor: colours.where,
                borderWidth: 1,
                maxWidth: !this.state.inputFocussed ? windowSize.width - (windowSize.width / 5) : null
              },
              textInput: {
                height: 34,
                marginTop: 4,
                marginBottom: 4,
                flex: 1
              },
              listView: {
                // height: deviceHeight,
                // ios - position: 'absolute',
                // left: 5,
                // right: 5,
                // top: 10, // 40
                backgroundColor: colours.verylightgray
              }
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          />
          { inputKey !== 0 &&
            <View
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingLeft: 5 }}
            >
              <View>
                <Icon
                  name="remove"
                  size={18}
                  color="gray"
                  style={{ }}
                  onPress={ removeInput }
                />
              </View>
            </View>
          }
          { inputKey === 0 &&
            <View
              style={{ flex: 1, paddingLeft: 5, justifyContent: 'center' }}
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
