/* eslint-disable react/no-array-index-key */
import Config from 'react-native-config';
import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Router from '../../router';
import AddInput from '../general/add-input';
import Button from '../common/Button';
import ImageHeader from '../common/ImageHeader';
import HeaderBack from '../common/CreateHeaderBackground';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import discardEvent from '../../lib/discard-event';

const windowSize = Dimensions.get('window');
const deviceHeight = windowSize.height;

export default class Where extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerRight: () => {
      return (
        <Button
          onPress={ discardEvent }
          buttonStyle={{ margin: 15 }}
          textStyle={{ color: colours.white, fontWeight: '600' }}
        >
          <Text>Cancel</Text>
        </Button>
      );
    },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  });

  constructor () {
    super();
    this.state = {
      listViewDisplayed: 'auto',
      inputFocussed: false,
      inputKeyFocussed: ''
    };
  }

  onPlaceSearch = (data, details, i) => {
    const place = details.website ? `${details.name} ${details.formatted_address}` : `${details.formatted_address}`;
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
      return (
        <View
          accessibilityLabel={`Where option ${inputKey + 1}`}
          key={ inputKey }
          style={{
            flexDirection: 'row',
            marginTop: 10,
            paddingHorizontal: 10 // #fff
            // zIndex: 999999
          }}
        >
          <GooglePlacesAutocomplete
            ref={ (googlePlaces) => {
              this.googlePlaces = googlePlaces;
              console.log('googlePlaces: ', googlePlaces);
              console.log('inputKey: ', inputKey);
            }}
            enablePoweredByContainer={false}
            placeholder="Enter a venue"
            minLength={2}
            autoFocus={false}
            fetchDetails
            isRowScrollable={false}
            listViewDisplayed={this.state.listViewDisplayed}
            textInputProps={{
              underlineColorAndroid: 'white',
              onKeyPress: (e) => { // IOS only
                if (e.nativeEvent.key === 'Enter') {
                  this.setState({ listViewDisplayed: 'false', inputFocussed: false });
                }
              },
              onChangeText: (text) => {
                console.log('onChangeText: ', text);

                this.checkForData();
                this.props.handleChange(text, inputKey);
              },
              onFocus: () => {
                this.setState({ inputFocussed: true, inputKeyFocussed: inputKey, listViewDisplayed: 'auto' });
              },
              onEndEditing: () => {
                this.setState({ inputFocussed: false, inputKeyFocussed: '' });
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
                flex: 10,
                borderRadius: 5,
                borderColor: colours.where,
                borderWidth: 1
                // backgroundColor: 'purple' // '#fff'
                // zIndex: 999999
              },
              textInputContainer: {
                backgroundColor: inputKey === this.state.inputKeyFocussed && this.state.inputFocussed ? colours.where : colours.white,
                height: 38,
                borderRadius: 5,
                borderColor: colours.where,
                borderWidth: 0,
                maxWidth: windowSize.width - (windowSize.width / 5)
              },
              textInput: {
                marginTop: 4,
                marginBottom: 4,
                flex: 1
              },
              listView: {
                height: deviceHeight,
                // ios - position: 'absolute',
                // left: 5,
                // right: 5,
                // top: 10, // 40
                backgroundColor: colours.verylightgray
              }
            }}
            nearbyPlacesAPI={'GooglePlacesSearch'}
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
          { borderWidth: 2, borderColor: 'red', backgroundColor: colours.white, flex: 1 }]}
      >
        {
          !this.state.inputFocussed && <HeaderBack />
        }
        <KeyboardAwareScrollView
          style={{ backgroundColor: colours.transparent, borderWidth: 2, borderColor: 'blue', marginTop: Platform.OS === 'ios' ? null : 80 }}
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
              margin: 5,
              marginTop: Platform.OS === 'ios' ? null : 70,
              marginHorizontal: 10 }}
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
                  <AddInput testDescription="Add Where option" data={ data } handler={ addInput } />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 0,
                    marginBottom: 10,
                    paddingLeft: 5,
                    paddingRight: 5 }}
                >
                  <Button
                    testDescription="Confirm Where"
                    buttonStyle={ [styles.confirmButton, { backgroundColor: colours.next, borderColor: colours.next }] }
                    textStyle={ styles.confirmButtonText }
                    onPress={ () => this.nextPage(name) }
                  >
                    Next
                  </Button>
                </View>
              </View>

            }
          </View>

        </KeyboardAwareScrollView>
      </View>
    );
  }
}
