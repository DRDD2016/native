import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TextInput, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Button from './common/Button';
import Spinner from './common/Spinner';
import styles from '../../styles';
import colours from '../../styles/colours';

export default class Profile extends Component {

  static route = {
    navigationBar: {
      title: 'Profile',
      backgroundColor: colours.blue,
      tintColor: colours.white
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


  render () {
    const { photo_url, firstname, surname, handleLogOut, handleChangeName } = this.props;
    const hideEditButton = (firstname === '' ? styles.hideEditButton : [styles.buttonStyle, { backgroundColor: 'green' }]);
    return (
      <View style={styles.profilePage}>
        <View style={styles.container}>

          <View style={styles.row}>
            <Text style={styles.userName}> { `${firstname} ${surname}` } </Text>
          </View>

          <View>
            <Image style={styles.uiProfilePagePhotoCircularImage} source={ this.state.avatarSource || { uri: photo_url } } />

            <Button
              buttonStyle={ [hideEditButton, { marginTop: 10, alignSelf: 'center' }] }
              textStyle={{ color: '#fff' }}
              onPress={ this.selectPhotoTapped }
            >
              Change Photo
            </Button>

          </View>

          <View style={styles.row}>
            <TextInput
              value={ firstname }
              placeholder="First name"
              onChangeText={ text => handleChangeName(text, 'firstname') }
              style={styles.inputStyle}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              value={ surname }
              placeholder="Surname"
              onChangeText={ text => handleChangeName(text, 'surname')}
              style={styles.inputStyle}
            />
          </View>

          <View style={styles.row}>
            { this.props.isFetching ? <Spinner /> :
            <Button
              buttonStyle={ [hideEditButton, { marginTop: 10, alignSelf: 'center' }] }
              textStyle={{ color: '#fff' }}
              onPress={ () => this.saveChanges(firstname, surname) }
            >
              Save changes
            </Button>}

          </View>

          <View style={styles.row}>
            <Button
              buttonStyle={ [hideEditButton, { marginTop: 10, alignSelf: 'center', backgroundColor: 'gray' }] }
              textStyle={{ color: '#fff' }}
              onPress={ () => handleLogOut(this.props.navigation) }
            >
              Log Out
            </Button>
          </View>
        </View>
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
