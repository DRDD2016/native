import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform, Linking } from 'react-native';
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

export default class Drawer extends Component {

  clickOpenURL (url) {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  render () {
    console.log(this.props);
    const { handleLogOut, navigation } = this.props;

    const aboutURL = 'http://spark-app.net/index.html';
    const helpURL = 'http://spark-app.net/faq.html';
    const feedbackURL = 'mailto:hello@spark-app.net?subject=SparkFeedback';


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
            onPress={() => this.clickOpenURL(helpURL)}
            style={inlineStyles.DrawerItemText}
          >
            Help
          </Text>
        </View>
        <View style={inlineStyles.DrawerItem}>
          <View style={{ marginRight: 10 }}><Icon name="info-circle" size={32} color={colours.gray} /></View>
          <Text
            onPress={() => this.clickOpenURL(aboutURL)}
            style={inlineStyles.DrawerItemText}
          >
            About
          </Text>
        </View>
        <View style={inlineStyles.DrawerItem}>
          <View style={{ marginRight: 5 }}><Icon name="bullhorn" size={32} color={colours.gray} /></View>
          <Text
            onPress={() => this.clickOpenURL(feedbackURL)}
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
            onPress={ () => handleLogOut(navigation) }
            style={inlineStyles.DrawerItemText}
          >
            Signout
          </Text>
        </View>
        <View
          style={[inlineStyles.DrawerItem,
          { borderTopWidth: 1, borderTopColor: colours.lightgray, marginTop: 5, justifyContent: 'center' }]}
        >
          <View style={{ marginRight: 7 }} />
          <Text
            style={[inlineStyles.DrawerItemText, { fontSize: 10 }]}
          >
            Privacy policy
          </Text>
        </View>
        <View style={[inlineStyles.DrawerItem, { justifyContent: 'center' }]}>
          <View style={{ marginRight: 7 }} />
          <Text
            style={[inlineStyles.DrawerItemText, { fontSize: 10 }]}
          >
            Terms and conditions
          </Text>
        </View>
      </View>
    );
  }


}
