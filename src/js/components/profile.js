import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import TopBar from './event/top-bar';
import Button from './common/Button';
import styles from '../../styles';

const Profile = ({ user, firstname, surname, handleLogOut, handleChangeName, handleEditName }) => {

  const hideEditButton = (firstname === '' ? styles.hideEditButton : [styles.buttonStyle, { backgroundColor: 'green' }]);

  function changeName (firstname, surname) { // eslint-disable-line no-shadow
    handleEditName(firstname, surname);
  }
  // <TopBar location={ location } />

  return (
    <View style={styles.profilePage}>
      <TopBar location="profile" />

      <View style={styles.container}>

        <View style={styles.row}>
          <Text style={styles.userName}> { `${firstname} ${surname}` } </Text>
        </View>

        <View style={styles.row}>
          <Image style={styles.uiProfilePagePhotoCircularImage} source={{ uri: user.photoURL }} />
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
            onPress={ () => changeName(firstname, surname) }
          >
            Change Name
          </Button>
        </View>

        <View style={styles.row}>
          <Button
            buttonStyle={[styles.buttonStyle, { backgroundColor: '#fff' }]}
            textStyle={[styles.buttonTextStyle, { color: 'lightgray' }]}
            onPress={ handleLogOut }
          >
            Log Out
          </Button>

        </View>

        <View style={styles.row}>
          <Button
            buttonStyle={[styles.buttonStyle, { backgroundColor: '#fff' }]}
            textStyle={[styles.buttonTextStyle, { color: 'lightgray' }]}
            onPress={ () => {} }
          >
            Return to main
          </Button>

        </View>

      </View>
    </View>
  );
};

export default Profile;
