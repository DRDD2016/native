import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TextInput, Platform, ScrollView, TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from './common/Button';
import Spinner from './common/Spinner';
import Header from './common/Header';
import styles from '../../styles';
import colours from '../../styles/colours';

export default class Profile extends Component {

  static route = {
    navigationBar: {
      title: 'Profile',
      backgroundColor: colours.transparent,
      tintColor: colours.darkgray
    }
  }

  constructor (props) {
    super(props);
    this.state = { avatarSource: null };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  saveChanges (firstname, surname) {
    this.props.handleUpload(this.state.avatarSource);
    this.props.handleEditName(firstname, surname);
  }

  selectPhotoTapped () {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxheight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button ', response.customButton);
      } else {
        let source;
        if (Platform.OS === 'android') {
          source = { uri: response.uri };
        } else {
          console.log('rss', response);
          source = { uri: response.uri.replace('file://', '') };
        }

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  renderAlert = () => {
    setTimeout(() => {
      this.props.navigator.showLocalAlert('You are not connected to Internet!', {
        text: { color: '#fff' },
        container: { backgroundColor: 'red' }
      });
    }, 2000);
  }

  render () {
    const { photo_url, firstname, surname, handleLogOut, handleChangeName, isConnected } = this.props;
    const hideEditButton = (firstname === '' ? styles.hideEditButton : [{ backgroundColor: 'green' }]);
    return (
      <View>
        <Header />
        <ScrollView style={styles.profilePage}>
          { !isConnected && this.renderAlert() }

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20 }}
          >

            <View style={[styles.row, { backgroundColor: colours.transparent }]}>
              <Text style={styles.userName}> { `${firstname} ${surname}` } </Text>
            </View>

            <View>

              <Image style={styles.uiProfilePagePhotoCircularImage} source={ this.state.avatarSource || { uri: photo_url } } />

              <TouchableHighlight
                style={ [hideEditButton, {
                  position: 'absolute',
                  right: -24,
                  bottom: 6,
                  padding: 5,
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  alignItems: 'flex-end'
                }] }
                onPress={ this.selectPhotoTapped }
              >
                <View>
                  <View>
                    <Icon name="camera" size={36} color={colours.white} />
                  </View>
                  <View style={{ position: 'absolute', top: 10, left: 10, width: 20, height: 20, backgroundColor: colours.white }} />
                  <View style={{ position: 'absolute', top: 3, left: 3 }}>
                    <Icon name="camera" size={30} color={colours.gray} />
                  </View>
                </View>
              </TouchableHighlight>

            </View>

            <View style={styles.row}>
              <TextInput
                underlineColorAndroid="transparent"
                value={ firstname }
                placeholder="First name"
                onChangeText={ text => handleChangeName(text, 'firstname') }
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.row}>
              <TextInput
                underlineColorAndroid="transparent"
                value={ surname }
                placeholder="Surname"
                onChangeText={ text => handleChangeName(text, 'surname')}
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.row}>
              { this.props.isFetching ? <Spinner /> :
              <Button
                buttonStyle={ [hideEditButton, styles.confirmButton, {
                  backgroundColor: colours.purple,
                  borderColor: colours.purple,
                  marginTop: 2,
                  flex: 1
                }] }
                textStyle={ styles.confirmButtonText }
                onPress={ () => this.saveChanges(firstname, surname) }
              >
                Save changes
              </Button>}

            </View>

            <View style={styles.row}>
              <Button
                buttonStyle={ [hideEditButton, styles.confirmButton, { backgroundColor: colours.white, borderColor: colours.gray, flex: 1 }] }
                textStyle={ [styles.confirmButtonText, { color: colours.gray }]}
                onPress={ () => handleLogOut(this.props.navigation) }
              >
                Log Out
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Profile.propTypes = {
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleEditName: PropTypes.func.isRequired,
  handleChangeName: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired
};
