import React, { Component } from 'react';
import { View, Text, Platform, TouchableHighlight, Image, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
// import { resetStackTo } from '../lib/navigate';
// import Router from '../router';
import Button from './common/Button';
import ButtonHeader from './common/ButtonHeader';
// import ImageHeader from './common/ImageHeader';
import BannerBar from './common/BannerBar';
import colours from '../../styles/colours';
import styles, { HeaderText } from './../../styles';

const { width } = Dimensions.get('window');
const imageWidth = styles.uiProfilePagePhotoCircularImage.width;
const cameraIconRight = (width / 2) - (imageWidth / 2) - 30;

// const inlineStyles = {
//
//   titleText: {
//     alignSelf: 'center',
//     marginTop: 50
//   },
//   avatarContainer: {
//     borderColor: '#9B9B9B',
//     borderWidth: 1 / PixelRatio.get(),
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   avatar: {
//     borderRadius: 75,
//     width: 150,
//     height: 150,
//     backgroundColor: colours.blue
//   },
//   shadow: {
//     ...Platform.select({
//       ios: {
//         shadowColor: 'rgba(0,0,0, .4)',
//         shadowOffset: { height: 1, width: 1 },
//         shadowOpacity: 1,
//         shadowRadius: 3
//       },
//       android: {
//         elevation: 2
//       }
//     })
//   },
//   skipButtonStyle: {
//     backgroundColor: colours.blue,
//     padding: 10,
//     flex: 1,
//     height: 50,
//     justifyContent: 'center'
//   },
//   skipButtonTextStyle: {
//     alignSelf: 'center',
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600'
//   },
//   saveButtonStyle: {
//     backgroundColor: colours.blue,
//     // height: 40,
//     borderRadius: 20,
//     padding: 10
//   },
//   saveButtonTextStyle: {
//     color: '#fff'
//   }
// };

export default class UploadPhoto extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' },
    title: 'Profile Photo',
    headerLeft: null,
    headerRight: <ButtonHeader onPress={() => navigation.goBack(null)}>
      <Text style={{ margin: 15, color: colours.gray }} onPress={ () => navigation.navigate('tabsMain') }>SKIP</Text>
    </ButtonHeader>,
    headerStyle: { backgroundColor: colours.headerBackgroundColor },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <HeaderText>Upload photo</HeaderText>
    </View>
  });

  constructor (props) {
    super(props);
    this.state = { avatarSource: null, avatarUri: null };
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
    const { photo_url } = this.props;
    const hideNext = this.state.avatarSource === null;

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: colours.white }}
        enableOnAndroid
        extraHeight={0}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ }}
      >
        <BannerBar />

        <View
          style={{ backgroundColor: colours.transparent, paddingTop: 4 }}
        >

          <View style={{ flex: 1, flexDirection: 'column' }} >
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={{ paddingTop: 4, textAlign: 'center', color: colours.main }}>
                Do you want to add a profile picture?
              </Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>

              <TouchableHighlight
                style={{
                  flexDirection: 'column', alignItems: 'center', marginTop: 5, borderColor: 'red', borderWidth: 0


                }}
                onPress={ this.selectPhotoTapped }
              >
                <View style={{ flexDirection: 'column', alignItems: 'center', borderColor: 'blue', borderWidth: 0 }}>
                  <View style={{ flexDirection: 'column', alignItems: 'center', borderColor: 'red', borderWidth: 0 }}>
                    <Image style={styles.uiProfilePagePhotoCircularImage} source={ this.state.avatarSource || { uri: photo_url }} />
                    <View style={{

                      position: 'absolute',
                      right: cameraIconRight - 105,
                      bottom: 6,
                      padding: 5,
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      alignItems: 'flex-end'
                    }}>
                      <View>
                        <Icon name="camera" size={36} color={colours.white} />
                      </View>
                      <View style={{ position: 'absolute', top: 10, left: 10, width: 20, height: 20, backgroundColor: colours.white }} />
                      <View style={{ position: 'absolute', top: 8, left: 8 }}>
                        <Icon name="camera" size={30} color={colours.gray} />
                      </View>
                    </View>

                  </View>
                  <View>
                    <Text style={{ paddingBottom: 4, textAlign: 'center', color: colours.main, borderColor: 'red', borderWidth: 0 }}>
                      {'Upload a photo'}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>

          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 0,
              marginBottom: 10,
              paddingLeft: 5,
              paddingRight: 5 }}
          >

            { (hideNext) &&
              <View />
            }
            { (!hideNext) &&
              <Button
                testDescription="Confirm When"
                buttonStyle={ [styles.buttonStyle, { flex: 1, marginHorizontal: 80 }] }
                textStyle={ styles.buttonTextStyle }
                activeOpacity={ 0.5 }
                onPress={ this.nextPage }
              >
                SAVE PHOTO
              </Button>
            }

          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
