import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
// import styles from '../../../styles';
import colours from '../../../styles/colours';

const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.8 : Header.HEIGHT * 2;
const logo = require('../../../img/sparkLoginLogo.png');

const inlineStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.offWhite,
    paddingTop: 10
  },
  DrawerItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  DrawerItemText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: colours.where
  }
});

export default function Drawer (navigation) {

  return (
    <View style={inlineStyles.container}>
      <View style={inlineStyles.DrawerItem}>
        <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />
      </View>
      <View style={inlineStyles.DrawerItem}>
        <View style={{ marginRight: 10 }}><Icon name="cog" size={32} color={colours.gray} /></View>
        <Text
          onPress={() => navigation.navigate('Settings')}
          style={inlineStyles.DrawerItemText}
        >
          Settings
        </Text>
      </View>
      <View style={inlineStyles.DrawerItem}>
        <View style={{ marginRight: 10 }}><Icon name="question-circle" size={32} color={colours.gray} /></View>
        <Text
          onPress={() => navigation.navigate('Help')}
          style={inlineStyles.DrawerItemText}
        >
          Help
        </Text>
      </View>
      <View style={inlineStyles.DrawerItem}>
        <View style={{ marginRight: 10 }}><Icon name="info-circle" size={32} color={colours.gray} /></View>
        <Text
          onPress={() => navigation.navigate('About')}
          style={inlineStyles.DrawerItemText}
        >
          About
        </Text>
      </View>
      <View style={inlineStyles.DrawerItem}>
        <View style={{ marginRight: 5 }}><Icon name="bullhorn" size={32} color={colours.gray} /></View>
        <Text
          onPress={() => navigation.navigate('Feedback')}
          style={inlineStyles.DrawerItemText}
        >
          Feedback
        </Text>
      </View>
      <View style={inlineStyles.DrawerItem}>
        <View style={{ marginRight: 5 }}><Icon name="share" size={32} color={colours.gray} /></View>
        <Text
          onPress={() => navigation.navigate('Refer')}
          style={inlineStyles.DrawerItemText}
        >
          Refer a friend
        </Text>
      </View>
      <View style={inlineStyles.DrawerItem}>
        <View style={{ marginRight: 7 }}><Icon name="sign-out" size={32} color={colours.gray} /></View>
        <Text
          onPress={() => navigation.navigate('Signout')}
          style={inlineStyles.DrawerItemText}
        >
          Signout
        </Text>
      </View>
    </View>
  );
}
