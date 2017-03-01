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

const windowSize = Dimensions.get('window');
const deviceHeight = windowSize.height;

const inlineStyle = {
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    zIndex: 999999
  }
};
export default class Where extends Component {

  static route = {
    navigationBar: {
      title (params) {
        return params.name;
      },
      tintColor: colours.white,
      backgroundColor: colours.blue
    }
  }

  onPlaceSearch = (data, details, i) => {
    const place = details.website ? `${details.name} ${details.formatted_address}` : `${details.formatted_address}`;
    this.props.handleChange(place, i);
  }

  nextPage = (name) => {
    this.props.navigator.push(Router.getRoute('when', { name }));
  }

  render () {
    const { data, name, addInput, removeInput } = this.props;
    const inputs = data.map((value, inputKey) => {
      return (
        <View key={ inputKey } style={inlineStyle.inputContainer}>
          <GooglePlacesAutocomplete
            enablePoweredByContainer={false}
            placeholder="Where"
            minLength={2}
            autoFocus={false}
            fetchDetails
            onPress={(searchData, details, index = inputKey) => this.onPlaceSearch(searchData, details, index)}
            query={{
              types: ['establishment', 'geocode'],
              key: Config.GOOGLE_PLACES_API_KEY,
              language: 'en',
              components: 'country:gb'
            }}
            styles={{
              textInputContainer: {
                backgroundColor: '#fff',
                borderRadius: 5,
                height: 38,
                borderTopColor: '#D3D3D3',
                borderBottomColor: '#D3D3D3',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderLeftColor: '#D3D3D3',
                borderRightColor: '#D3D3D3',
                maxWidth: windowSize.width - (windowSize.width / 5)
              },
              textInput: {
                marginTop: 4,
                padding: 4
              },
              listView: {
                height: deviceHeight,
                position: 'absolute',
                left: 5,
                right: 5,
                top: 40,
                backgroundColor: '#fff'
              },
              container: {
                marginTop: 10,
                backgroundColor: '#fff',
                zIndex: 999999
              }
            }}
            nearbyPlacesAPI={'GooglePlacesSearch'}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          />
          { inputKey !== 0 &&
            <Icon
              name="remove"
              size={14}
              color="gray"
              style={{ alignSelf: 'center', marginRight: 25, marginTop: 15 }}
              onPress={ removeInput }
            />
          }
        </View>
      );
    });

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#fff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={ [styles.container, { marginHorizontal: 10 }] }>
          <Text style={ styles.smallMessageText } >
            Enter where the event will take place (or leave blank to decide it later).
          </Text>
          <Text style={ styles.smallMessageText }>
            You can add more than one option to create a poll.
          </Text>

          { inputs }

          <AddInput data={ data } handler={ addInput } />

          <View style={ styles.row }>
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
