import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Image, TextInput, Platform, ScrollView, TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Header } from 'react-navigation';
import Fabric from 'react-native-fabric';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles, ConfirmButton, ConfirmButtonText } from '../../styles';
import Spinner from './common/Spinner';
import FeedHeader from './common/FeedHeader';
import colours from '../../styles/colours';
// import { connectAlert } from './Alert';
import ButtonHeader from './common/ButtonHeader';
import BurgerIcon from './common/burger-icon';
import OfflineIconContainer from '../containers/common/OfflineIconContainer';

const { Answers } = Fabric;
const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.8 : Header.HEIGHT * 0.8;
const logo = require('../../img/sparkLoginLogo.png');

class Profile extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ButtonHeader />,
    headerRight: <View style={{ flexDirection: 'row', alignItems: 'center' }}>

      <OfflineIconContainer />
      <ButtonHeader
        onPress={() => navigation.openDrawer()}
      >
        <BurgerIcon />
      </ButtonHeader>
    </View>,
    headerStyle: { backgroundColor: colours.headerBackgroundColor },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />
    </View>
  });

  constructor (props) {
    super(props);
    this.state = { avatarSource: null, avatarUri: null };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  componentWillMount () {

    console.log('ProfileWillMount');
    console.log('ProfileWillMountThisProps: ', this.props);

  }

  componentDidMount () {
    Answers.logCustom('Profile.js Mounted', { additionalData: 'nothing' });
  }

  componentWillReceiveProps (nextProps) {
    console.log('ProfileWillReceiveThisProps: ', this.props);
    console.log('ProfileWillReceiveNextProps: ', nextProps);

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

    const { photo_url, firstname, surname, handleChangeName, isConnected } = this.props;
    const hideEditButton = (firstname === '' ? styles.hideEditButton : [{ backgroundColor: 'green' }]);
    return (
      <View style={{ flex: 1 }}>
        <FeedHeader>
          { !isConnected && this.renderAlert() }
        </FeedHeader>
        <View
          style={{
            flex: 1,
            backgroundColor: colours.white,
            borderBottomWidth: 1,
            borderBottomColor: colours.lightgray }}
        >

          <ScrollView style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 50 : null }}>

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 5 }}
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
                <ConfirmButton
                  buttonStyle={ [hideEditButton, styles.confirmButton, {
                    backgroundColor: colours.purple,
                    borderColor: colours.purple,
                    marginTop: 2
                  }] }
                  textStyle={ styles.confirmButtonText }
                  onPress={ () => this.saveChanges(firstname, surname) }
                >
                  <ConfirmButtonText>
                  Save changes
                  </ConfirmButtonText>
                </ConfirmButton>}

              </View>

            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired,
  handleEditName: PropTypes.func.isRequired,
  handleChangeName: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired
};

// export default connectAlert(Profile);
export default Profile;
