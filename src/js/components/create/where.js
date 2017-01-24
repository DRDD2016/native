import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import Router from '../../router';
import AddInput from '../general/add-input';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const windowSize = Dimensions.get('window');
const deviceHeight = windowSize.height;

// import GOOGLE_PLACES_API_KEY from '../../keys';

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
    console.log(data);
    const inputs = data.map((value, inputKey) => {
      return (
        <View key={ inputKey }>
          <GooglePlacesAutocomplete
            enablePoweredByContainer={false}
            placeholder="Where"
            minLength={2}
            autoFocus={false}
            fetchDetails
            onPress={(searchData, details, index = inputKey) => this.onPlaceSearch(searchData, details, index)}
            query={{
              types: ['establishment', 'geocode'],
              key: process.env.GOOGLE_PLACES_API_KEY || require('../../keys').GOOGLE_PLACES_API_KEY,
              language: 'en'
            }}
            styles={{
              textInputContainer: {
                backgroundColor: '#fff',
                borderRadius: 5,
                marginHorizontal: 10,
                height: 40,
                borderTopColor: '#7e7e7e',
                borderBottomColor: '#b5b5b5',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderLeftColor: '#7e7e7e',
                borderRightColor: '#7e7e7e',
                maxWidth: windowSize.width - (windowSize.width / 5)
              },
              listView: {
                height: deviceHeight,
                position: 'absolute',
                left: 10,
                right: 10,
                top: 40,
                backgroundColor: '#fff'
              },
              container: {
                marginTop: 10,
                marginBottom: 50,
                backgroundColor: '#fff',
                zIndex: 999999
              }
            }}
            nearbyPlacesAPI={'GooglePlacesSearch'}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          >

            <Text>Remove</Text>

          </GooglePlacesAutocomplete>
        </View>
      );
    });

    const hideNext = data[0] === '';

    return (
      <View>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={ styles.smallMessageText } >
            Enter where the event will take place (or leave blank to decide it later).
          </Text>
          <Text style={ styles.smallMessageText }>
            You can add more than one option to create a poll.
          </Text>

          { inputs }

          <AddInput data={ data } handler={ addInput } />

          <View style={ styles.row }>
            { (hideNext) &&
              <View />
            }
            { (!hideNext) &&
              <Button
                buttonStyle={ styles.buttonStyle }
                onPress={ () => this.nextPage(name) }
              >
                Next
              </Button>
            }
          </View>

        </View>
      </View>
    );
  }
}
