import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform, Linking, TouchableOpacity } from 'react-native';
import { Header, DrawerActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { menuWidth } from '../../../styles';
import colours from '../../../styles/colours';
import BurgerIcon from '../common/burger-icon';
import { moderateScale } from '../../../styles/scaling';
import { composeLinkToShare } from '../../lib/branchLink';
import { store } from '../../init-store';

const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.8 : Header.HEIGHT * 1.25;
const logo = require('../../../img/sparkLoginLogo.png');

const inlineStyles = StyleSheet.create({
  container: {
    flex: 1,
    // width: menuWidth,
    backgroundColor: colours.offWhite
  },
  HeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  DrawerItem: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: 10,
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  LogoWrapper: {
    paddingLeft: moderateScale(15),
    paddingRight: 0,
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  DrawerItemText: {
    fontSize: moderateScale(14),
    fontWeight: 'normal',
    color: colours.where
  }
});

export default class Drawer extends Component {

  clickOpenURL (url) {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  shareApp () {
    composeLinkToShare(store.getState().user);
  }

  render () {
    console.log(this.props);
    const { handleLogOut, navigation } = this.props;

    const aboutURL = 'http://www.spark-app.net/index.html';
    const helpURL = 'http://www.spark-app.net/faq.html';
    const feedbackURL = 'mailto:hello@spark-app.net?subject=SparkFeedback';
    const PrivacyURL = 'http://www.spark-app.net/privacy-policy.html';
    const TermsURL = 'http://www.spark-app.net/terms-and-conditions.html';


    return (
      <View style={inlineStyles.container}>

        <TouchableOpacity style={inlineStyles.HeaderRow} onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>

          <View style={inlineStyles.LogoWrapper}>
            <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: BurgerIcon.WIDTH,
              height: Header.HEIGHT }}
          >
            <BurgerIcon />
          </View>

        </TouchableOpacity>

        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={() => navigation.navigate('settings')}>
          <View style={{ marginRight: 10 }}><Icon name="cog" size={32} color={colours.gray} /></View>
          <Text
            style={inlineStyles.DrawerItemText}
          >
            Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={() => this.clickOpenURL(helpURL)}>
          <View style={{ marginRight: 10 }}><Icon name="question-circle" size={32} color={colours.gray} /></View>
          <Text
            style={inlineStyles.DrawerItemText}
          >
            Help
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={() => this.clickOpenURL(aboutURL)}>
          <View style={{ marginRight: 10 }}><Icon name="info-circle" size={32} color={colours.gray} /></View>
          <Text
            style={inlineStyles.DrawerItemText}
          >
            About
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={() => this.clickOpenURL(feedbackURL)}>
          <View style={{ marginRight: 5 }}><Icon name="bullhorn" size={32} color={colours.gray} /></View>
          <Text
            style={inlineStyles.DrawerItemText}
          >
            Feedback
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={() => this.shareApp()}>
          <View style={{ marginRight: 5 }}><Icon name="share" size={32} color={colours.gray} /></View>
          <Text
            style={inlineStyles.DrawerItemText}
          >
            Refer a friend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={ () => handleLogOut(navigation) }>
          <View style={{ marginRight: 7 }}><Icon name="sign-out" size={32} color={colours.gray} /></View>
          <Text
            style={inlineStyles.DrawerItemText}
          >
            Signout
          </Text>
        </TouchableOpacity>
        <View
          style={[inlineStyles.DrawerItem,
          { borderTopWidth: 1, borderTopColor: colours.lightgray, marginTop: 5, justifyContent: 'center' }]}
        >
          <View style={{ marginRight: 7 }} />
          <TouchableOpacity onPress={() => this.clickOpenURL(PrivacyURL)}>
            <Text
              style={[inlineStyles.DrawerItemText, { fontSize: moderateScale(10) }]}
            >
              Privacy policy
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[inlineStyles.DrawerItem, { justifyContent: 'center' }]}>
          <View style={{ marginRight: 7 }} />
          <TouchableOpacity onPress={() => this.clickOpenURL(TermsURL)}>
            <Text
              style={[inlineStyles.DrawerItemText, { fontSize: moderateScale(10) }]}
            >
              Terms and conditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


}
