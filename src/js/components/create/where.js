/* eslint-disable react/no-array-index-key */
import Config from 'react-native-config';
import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import Router from '../../router';
import AddInput from '../general/add-input';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import discardEvent from '../../lib/discard-event';

const windowSize = Dimensions.get('window');
const deviceHeight = windowSize.height;

export default class Where extends Component {

  static route = {
    navigationBar: {
      title (params) {
        return params.name;
      },
      tintColor: colours.white,
      backgroundColor: colours.blue,
      renderRight: () => {
        return (
          <Button
            onPress={ discardEvent }
            buttonStyle={{ margin: 15 }}
            textStyle={{ color: colours.white, fontWeight: '600' }}
          >
            <Text>Cancel</Text>
          </Button>
        );
      }
    }
  }

  constructor () {
    super();
    this.state = {
      listViewDisplayed: 'auto'
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
    this.props.navigator.push(Router.getRoute('when', { name }));
  }

  render () {
    const { data, name, addInput, removeInput } = this.props;
    const inputs = data.map((value, inputKey) => {
      return (
        <View
          key={ inputKey }
          style={{
            flexDirection: 'row',
            marginTop: 10,
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 5,
            paddingHorizontal: 10 // #fff
            // zIndex: 999999
          }}
        >
          <GooglePlacesAutocomplete
            ref={ (googlePlaces) => {
              this.googlePlaces = googlePlaces;
            }}
            enablePoweredByContainer={false}
            placeholder="Where"
            minLength={2}
            autoFocus={false}
            fetchDetails
            listViewDisplayed={this.state.listViewDisplayed}
            textInputProps={{
              underlineColorAndroid: 'white',
              onKeyPress: (e) => {
                if (e.nativeEvent.key === 'Enter') {
                  this.setState({ listViewDisplayed: 'false' });
                }
              },
              onChangeText: (text) => {
                this.checkForData();
                this.props.handleChange(text, inputKey);
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
                backgroundColor: 'purple' // '#fff'
                // zIndex: 999999
              },
              textInputContainer: {
                backgroundColor: '#fff',
                // borderRadius: 5,
                height: 38,
                borderColor: '#D3D3D3',
                borderWidth: 1,
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
                left: 5,
                right: 5,
                top: 10, // 40
                backgroundColor: 'pink' // #fff',
              }
            }}
            nearbyPlacesAPI={'GooglePlacesSearch'}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          />
          { inputKey !== 0 &&
            <View
              style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'red', flex: 1, paddingLeft: 5 }}
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
              style={{ backgroundColor: 'red', flex: 1, paddingLeft: 5, justifyContent: 'center' }}
            />
          }
        </View>
      );
    });

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: 'red' }} // #fff
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={ [styles.container, { marginHorizontal: 10 }, { backgroundColor: 'orange' }]}>
          <Text style={ styles.smallMessageText } >
            Enter where the event will take place (or leave blank to decide it later).
          </Text>
          <Text style={ styles.smallMessageText }>
            You can add more than one option to create a poll.
          </Text>

          { inputs }

          <AddInput data={ data } handler={ addInput } />

          <View style={[styles.row, { marginTop: 20 }] }>
            <Button
              buttonStyle={ styles.buttonStyle }
              onPress={ () => this.nextPage(name) }
            >
              Next
            </Button>
          </View>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}
