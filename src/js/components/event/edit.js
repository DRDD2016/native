import React, { Component } from 'react';
import { View, TextInput, Dimensions, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Config from 'react-native-config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTime from '../common/date-time';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import Button from '../common/Button';
import ButtonHeader from '../common/ButtonHeader';
import ImageHeader from '../common/ImageHeader';
import HeaderBack from '../common/CreateHeaderBackground';
import BackIcon from '../common/back-icon';
import CloseButton from '../common/CloseButton';


const windowSize = Dimensions.get('window');

export default class Edit extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Edit event',
    headerLeft: <ButtonHeader
      onPress={() => navigation.goBack(null)}
    >
      <BackIcon />
    </ButtonHeader>,
    headerRight: <CloseButton stack="ScreenCreate" nav={navigation} />,
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  });

  constructor () {
    super();
    this.state = {
      listViewDisplayed: 'auto',
      tbcSwitch: undefined,
      inputFocussed: false
    };
  }

  onPlaceSearch = (data, details, i) => {
    const place = details.website ? `${details.name} ${details.formatted_address}` : `${details.formatted_address}`;
    this.setState({ inputFocussed: false }); // clears listview and unhides Where text,etc
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
      <KeyboardAwareScrollView
        style={{ backgroundColor: colours.white }}
        enableOnAndroid
        extraHeight={80}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ }}
      >
        <HeaderBack />
        <View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              margin: 5
              // borderColor: 'yellow',
              // borderWidth: 2
            }}
          >
            <Text style={{ alignSelf: 'flex-start' }}>Event Details</Text>
            <View style={ styles.row }>
              <TextInput
                style={ styles.inputStyle }
                onChangeText={ text => handleDetailsChange(text, 'name') }
                value={ name }
                type="text"
                placeholder="Event name"
                underlineColorAndroid="transparent"
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
                underlineColorAndroid="transparent"
                autoCorrect
              />
            </View>
            <View style={ styles.row }>
              <TextInput
                style={ styles.inputStyle }
                onChangeText={ text => handleDetailsChange(text, 'note') }
                value={ note }
                placeholder="Leave a note to your friends (optional)"
                underlineColorAndroid="transparent"
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
                underlineColorAndroid="transparent"
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
                listViewDisplayed={this.state.inputFocussed}
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
                  container: {
                    // flex: !this.state.inputFocussed ? 10 : null,
                    width: this.state.inputFocussed ? windowSize.width : null
                    // borderRadius: 5,
                    // borderColor: 'red',
                    // borderWidth: 1
                    // backgroundColor: 'purple' // '#fff'
                    // zIndex: 999999
                  },
                  textInputContainer: {
                    backgroundColor: this.state.inputFocussed ? colours.where : colours.white,
                    height: 38,
                    borderRadius: 1,
                    borderColor: colours.where,
                    borderWidth: 1
                    // maxWidth: !this.state.inputFocussed ? windowSize.width - (windowSize.width / 5) : null
                  },
                  textInput: {
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

          <View
            style={{
              // borderColor: 'red',
              // borderWidth: 2,
              flexDirection: 'row',
              marginTop: 0,
              marginBottom: 10,
              paddingLeft: 5,
              paddingRight: 5 }}
          >
            <Button
              buttonStyle={ [styles.buttonStyle, { flex: 1 }] }
              textStyle={styles.buttonTextStyle}
              onPress={ () => {
                handleEditEvent(event, event_id);
                this.props.navigation.goBack();
              }}
            >
              Update
            </Button>
          </View>


          <View style={{ height: 60 }} />
        </View>
      </KeyboardAwareScrollView>
    );
  }

}
