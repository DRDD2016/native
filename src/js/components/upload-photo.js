import React, { Component } from 'react';
import { View, Text, Platform, PixelRatio, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import { resetStackTo } from '../lib/navigate';
// import Router from '../router';
import Header from './common/Header';
import colours from '../../styles/colours';
import styles from '../../styles';

const inlineStyles = {
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
    height: 150,
    backgroundColor: colours.blue
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      }
    })
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
  },
  saveButtonStyle: {
    backgroundColor: colours.blue,
    // height: 40,
    borderRadius: 20,
    padding: 10
  },
  saveButtonTextStyle: {
    color: '#fff'
  }
};

export default class UploadPhoto extends Component {

  static navigationOptions = {
    title: 'Profile Photo',
    headerLeft: null,
    headerRight: <Text style={{ margin: 15, color: '#fff' }} onPress={ () => this.props.navigation.navigate('Feed') }>SKIP</Text>
  };

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
          source = { uri: response.uri.replace('file://', '') };
        }

        this.setState({
          avatarUri: response.uri,
          avatarSource: source
        });
      }
    });
  }

  nextPage () {

    let uploadSource = '';

    if (Platform.OS === 'android') {
      uploadSource = { uri: this.state.avatarUri };
    } else {
      uploadSource = { uri: this.state.avatarUri.replace('file://', '') };
    }

    this.props.handleUpload(uploadSource);
    this.props.navigation.navigate('tabsMain');
  }

  render () {
    return (
      <View style={{ flex: 1, backgroundColor: colours.white }}>
        <Header />
        <View style={{ flex: 1, marginTop: 70 }}>
          <View style={ inlineStyles.uploadContainer }>
            <TouchableOpacity onPress={ this.selectPhotoTapped } active={0.3}>
              <View style={ [inlineStyles.avatar, inlineStyles.avatarContainer, inlineStyles.shadow, { marginBottom: 20 }] }>
                { this.state.avatarSource === null ? <Text style={{ color: '#fff' }}>Select a Photo</Text> :
                <Image style={ inlineStyles.avatar } source={ this.state.avatarSource } />
                }
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 15, flex: 1 }}>
            <TouchableOpacity activeOpacity={ 0.5 } onPress={ this.nextPage }>
              <View style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>SAVE & NEXT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
