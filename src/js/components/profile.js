import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import Button from './common/Button';
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

  changeName (firstname, surname) {
    this.props.handleEditName(firstname, surname);
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

          <View style={styles.row}>
            <Image style={styles.uiProfilePagePhotoCircularImage} source={{ uri: photo_url }} />
          </View>

          <View style={styles.row}>
            <Text style={styles.editNameTitle}> Change Name </Text>
          </View>

          <View style={styles.row}>
            <TextInput
              value={ firstname }
              placeholder="First name"
              onChangeText={ e => handleChangeName('firstname', e) }
              style={styles.inputStyle}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              value={ surname }
              placeholder="Surname"
              onChangeText={ e => handleChangeName('surname', e)}
              style={styles.inputStyle}
            />
          </View>

          <View style={styles.row}>

            <Button
              buttonStyle={ hideEditButton }
              textStyle={[styles.buttonTextStyle, { color: 'white' }]}
              onPress={ () => this.changeName(firstname, surname) }
            >
              Change Name
            </Button>
          </View>

          <View style={styles.row}>
            <Button
              buttonStyle={[styles.buttonStyle, { backgroundColor: '#fff' }]}
              textStyle={[styles.buttonTextStyle, { color: 'lightgray' }]}
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
  handleChangeName: PropTypes.func.isRequired
};
