import React, { Component } from 'react';
import { View, Text, Platform, PixelRatio, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Router from '../router';
import Button from './common/Button';
import colours from '../../styles/colours';

const styles = {
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    alignSelf: 'center',
    marginTop: 50
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  skipButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  skipButtonStyle: {
    backgroundColor: colours.blue,
    padding: 10,
    flex: 1,
    height: 50,
    justifyContent: 'center'
  },
  skipButtonTextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
};

export default class UploadPhoto extends Component {

  constructor (props) {
    super(props);
    this.state = { avatarSource: null };
    this.nextPage = this.nextPage.bind(this);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
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
      console.log('Response= ', response);

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
          console.log('uri', response.uri.replace('file://', ''));
          source = { uri: response.uri.replace('file://', '') };
        }

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  nextPage () {
    this.props.navigator.immediatelyResetStack([Router.getRoute('navbar')], 0);
  }

  render () {
    console.log('props', this.props);
    return (
      <View style={{ flex: 1 }}>
        <Text style={ styles.titleText }>Upload Photo</Text>
        <View style={ styles.uploadContainer }>
          <TouchableOpacity onPress={ this.selectPhotoTapped }>
            <View style={ [styles.avatar, styles.avatarContainer, { marginBottom: 20 }] }>
              { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
              <Image style={ styles.avatar } source={ this.state.avatarSource } />
              }
            </View>
          </TouchableOpacity>
        </View>
        <View style={ styles.skipButtonContainer }>
          <Button
            buttonStyle={ styles.skipButtonStyle }
            textStyle={ styles.skipButtonTextStyle }
            onPress={ this.nextPage }
          >
            SKIP
          </Button>
        </View>
      </View>
    );
  }
}
