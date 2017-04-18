import React, { Component } from 'react';
import { View, TextInput, ScrollView, Dimensions, Text, KeyboardAvoidingView } from 'react-native';
import Config from 'react-native-config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTime from '../common/date-time';
import Header from '../common/Header';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import Button from '../common/Button';

const windowSize = Dimensions.get('window');
const deviceHeight = windowSize.height;

export default class Edit extends Component {

  static route = {
    navigationBar: {
      title: 'Edit event',
      backgroundColor: colours.transparent,
      tintColor: colours.darkgray
    }
  }
  constructor () {
    super();
    this.state = {
      listViewDisplayed: 'auto',
      tbcSwitch: undefined
    };
  }

  onPlaceSearch = (data, details, i) => {
    const place = details.website ? `${details.name} ${details.formatted_address}` : `${details.formatted_address}`;
    this.props.handleWhereChange(place, i);
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
    const { event, handleDetailsChange, handleWhatChange,
      handleWhereChange, handleDateChange, handleTimeChange, handleEditEvent, event_id } = this.props;
    const { name, description, note, what, where, when } = event;

    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flex: 1, marginTop: 70 }}>
          <ScrollView>
            <KeyboardAvoidingView
              behavior="padding"
            >
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: 5 }}
              >
                <Text style={{ alignSelf: 'flex-start' }}>Event Details</Text>
                <View style={ styles.row }>
                  <TextInput
                    style={ styles.inputStyle }
                    onChangeText={ text => handleDetailsChange(text, 'name') }
                    value={ name }
                    type="text"
                    placeholder="Event name"
                    autoCorrect
                  />
                </View>
                <View style={ styles.row }>
                  <TextInput
                    style={ styles.inputStyle }
                    onChangeText={ text => handleDetailsChange(text, 'description') }
                    value={ description }
                    type="text"
                    placeholder="Event description"
                    autoCorrect
                  />
                </View>
                <View style={ styles.row }>
                  <TextInput
                    style={ styles.inputStyle }
                    onChangeText={ text => handleDetailsChange(text, 'note') }
                    value={ note }
                    placeholder="Leave a note to your friends (optional)"
                    autoCorrect
                  />
                </View>
                <Text style={{ alignSelf: 'flex-start' }}>What</Text>
                <View style={ styles.row }>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={ text => handleWhatChange(text) }
                    value={ what[0] }
                    placeholder="What would you like to do?"
                  />
                </View>
                <Text style={{ alignSelf: 'flex-start' }}>Where</Text>
                <View style={ styles.row }>
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
                      onChangeText: (text) => {
                        this.checkForData();
                        handleWhereChange(text);
                      }
                    }}
                    onPress={(searchData, details, index = 0) => this.onPlaceSearch(searchData, details, index)}
                    query={{
                      types: ['establishment', 'geocode'],
                      key: Config.GOOGLE_PLACES_API_KEY,
                      language: 'en'
                    }}
                    getDefaultValue={() => where[0] }
                    styles={{
                      textInputContainer: {
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        height: 40,
                        borderTopColor: '#D3D3D3',
                        borderBottomColor: '#D3D3D3',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderLeftColor: '#D3D3D3',
                        borderRightColor: '#D3D3D3',
                        maxWidth: windowSize.width - (windowSize.width / 15)
                      },
                      textInput: {
                        marginTop: 4,
                        padding: 2
                      },
                      listView: {
                        height: deviceHeight * 0.4,
                        position: 'relative',
                        left: 5,
                        right: 5,
                        backgroundColor: '#fff',
                        zIndex: 99999999
                      },
                      container: {
                        backgroundColor: '#fff',
                        zIndex: 999999
                      }
                    }}
                    nearbyPlacesAPI={'GooglePlacesSearch'}
                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                  />
                </View>
                <Text style={{ alignSelf: 'flex-start' }}>When</Text>
                {
                  when.map((data, i) => {
                    return (
                      <DateTime
                        data={data}
                        handleDate={handleDateChange}
                        handleTime={handleTimeChange}
                        index={i}
                        key={Math.random()}
                      />
                    );
                  })
                }
              </View>

              <View>
                <Button
                  buttonStyle={styles.buttonStyle}
                  textStyle={styles.buttonTextStyle}
                  onPress={ () => {
                    handleEditEvent(event, event_id);
                    this.props.navigator.pop();
                  }}
                >
                  Update
                </Button>
              </View>
              <View style={{ height: 60 }} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    );
  }

}
