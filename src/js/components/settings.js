import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Image, Platform, TouchableHighlight, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import { Header } from 'react-navigation';
import Fabric from 'react-native-fabric';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import BannerBar from './common/BannerBar';
import Spinner from './common/Spinner';
import InputField from './general/inputField';
import styles, { ConfirmButton, ConfirmButtonText } from '../../styles';
import colours from '../../styles/colours';
import { FormLabelText } from '../../styles/text';
import { moderateScale, feedHorizPaddingScale } from '../../styles/scaling';
// import { connectAlert } from './Alert';
import ButtonHeader from './common/ButtonHeader';
import BackIcon from './common/back-icon';

const { width } = Dimensions.get('window');
const imageWidth = styles.uiProfilePagePhotoCircularImage.width;
const cameraIconRight = (width / 2) - (imageWidth / 2) - 30;


const { Answers } = Fabric;

class Settings extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' },
    title: 'Settings',
    headerLeft: <ButtonHeader onPress={() => navigation.goBack(null)}>
      <BackIcon />
    </ButtonHeader>,
    headerRight: <ButtonHeader />,
    headerStyle: { backgroundColor: colours.headerBackgroundColor },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor

  });

  constructor (props) {
    super(props);
    this.state = { avatarSource: null, avatarUri: null };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  componentWillMount () {

    console.log('Profile/Setting WillMount');
    // console.log('ProfileWillMountThisProps: ', this.props);

  }

  componentDidMount () {
    Answers.logCustom('Profile.js Mounted', { additionalData: 'nothing' });
  }

  componentWillReceiveProps () {
    console.log('Profile WillRec Props');
    // console.log('ProfileWillReceiveThisProps: ', this.props);
    // console.log('ProfileWillReceiveNextProps: ', nextProps);

  }

  saveChanges (firstname, surname) {

    let uploadSource = '';

    if (Platform.OS === 'android') {
      // console.log('this.state.avatarUri', this.state.avatarUri);
      uploadSource = { uri: this.state.avatarUri };
    } else {
      // console.log('this.state.avatarUri: ', this.state.avatarUri);
      uploadSource = { uri: this.state.avatarUri.replace('file://', '') };
    }
    // console.log(uploadSource); // /var/mobile/Containers/Data/Application/1F15368F-4…ocuments/2BE4B05B-440A-41B6-8680-F4230E046902.jpg
    this.props.handleUpload(uploadSource);
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
        // console.log('User cancelled photo picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button ', response.customButton);
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


  render () {

    console.log('Profile/Settings render');

    const { photo_url, firstname, surname, handleChangeName } = this.props;
    const hideEditButton = (firstname === '' ? styles.hideEditButton : [{ backgroundColor: 'green' }]);
    return (
      <View style={{ flex: 1 }}>
        <BannerBar style={{ marginTop: 0 }} />


        <View
          style={{
            flex: 1,
            backgroundColor: colours.white,
            borderBottomWidth: 1,
            borderBottomColor: colours.lightgray }}
        >
          <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: colours.white }}
            enableOnAndroid
            extraHeight={80}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >

            <View
              style={{

                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center' }}
            >

              <View style={{ width: '100%', flexDirection: 'row' }} >
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: moderateScale(4), marginHorizontal: feedHorizPaddingScale(4) }} // eslint-disable-line max-len
                  >
                    <FormLabelText style={{ paddingLeft: 4, marginTop: 20, textAlign: 'center', color: colours.main }}>
                      Profile Photo
                    </FormLabelText>
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>

                    <Image style={styles.uiProfilePagePhotoCircularImage} source={ this.state.avatarSource || { uri: photo_url } } />

                    <TouchableHighlight
                      style={ [hideEditButton, {
                        position: 'absolute',
                        right: cameraIconRight,
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

                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'column' // borderColor: 'yellow', borderWidth: 4
                }}>
                  <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                    <InputField
                      underlineColorAndroid="transparent"
                      placeholder="First name"
                      autoCorrect={ false }
                      value={ firstname }
                      labelType="notPoll"
                      label="First name"
                      onChangeText={ text => handleChangeName(text, 'firstname') }
                      focussedColor={ colours.main }
                      unfocussedColor={ colours.lightgray }
                    />
                  </View>
                  <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                    <InputField
                      underlineColorAndroid="transparent"
                      placeholder="Surname"
                      autoCorrect={ false }
                      value={ surname }
                      labelType="notPoll"
                      label="Surname"
                      onChangeText={ text => handleChangeName(text, 'surname')}
                      focussedColor={ colours.main }
                      unfocussedColor={ colours.lightgray }
                    />
                  </View>
                  <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                    { this.props.profileUserIsFetching ? <Spinner /> :
                    <ConfirmButton

                      onPress={ () => this.saveChanges(firstname, surname) }
                    >
                      <ConfirmButtonText>
                        Save changes
                      </ConfirmButtonText>
                    </ConfirmButton>}

                  </View>

                </View>
              </View>


            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

Settings.propTypes = {
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired,
  handleEditName: PropTypes.func.isRequired,
  handleChangeName: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired
};

// export default connectAlert(Settings);
export default Settings;
