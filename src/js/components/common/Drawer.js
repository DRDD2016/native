import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, Linking, TouchableOpacity } from 'react-native';
import { Header, DrawerActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { menuWidth } from '../../../styles';
import colours from '../../../styles/colours';
import BurgerIcon from '../common/burger-icon';
import { moderateScale, iconScale } from '../../../styles/scaling';
import { DrawerItemText, DrawerLinkText } from '../../../styles/text';
import { composeLinkToShare } from '../../lib/branchLink';
import { store } from '../../init-store';

// const NAVBAR_HEIGHT = Header.HEIGHT;
const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.8 : Header.HEIGHT * 1.25;
const logo = require('../../../img/sparkLoginLogo.png');

const inlineStyles = StyleSheet.create({

  DrawerItem: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    alignItems: 'center',
    flexDirection: 'row'
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

    const aboutURL = 'http://www.spark-app.net';
    const helpURL = 'http://www.spark-app.net/help';
    const feedbackURL = 'mailto:hello@spark-app.net?subject=SparkFeedback';
    const PrivacyURL = 'http://www.spark-app.net/privacy';
    const TermsURL = 'http://www.spark-app.net/terms';


    return (
      <View style={{ flex: 1, backgroundColor: colours.offWhite }}>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            // borderColor: 'red',
            // borderWidth: 1,
            justifyContent: 'space-between' }}
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>

          <View style={{
            paddingHorizontal: moderateScale(10),
            justifyContent: 'flex-start',
            flexDirection: 'row'
            // borderColor: 'red',
            // borderWidth: 1
          }}
          >
            <Image
              style={{
                // borderColor: 'blue',
                // borderWidth: 1,
                height: '100%',
                width: logoHeight * 3

              }}
              source={ logo }
              resizeMode="contain"
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: iconScale(15),
              borderColor: 'red',
              borderWidth: 1
            }}
          >
            <BurgerIcon />
          </View>

        </TouchableOpacity>

        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={() => navigation.navigate('settings')}>
          <View style={{ marginRight: 10 }}><Icon name="user" size={32} color={colours.gray} /></View>
          <DrawerItemText
          >
            Settings
          </DrawerItemText>
        </TouchableOpacity>
        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={() => this.clickOpenURL(helpURL)}>
          <View style={{ marginRight: 10 }}><Icon name="question-circle" size={32} color={colours.gray} /></View>
          <DrawerItemText
          >
            Help
          </DrawerItemText>
        </TouchableOpacity>
        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={() => this.clickOpenURL(aboutURL)}>
          <View style={{ marginRight: 10 }}><Icon name="info-circle" size={32} color={colours.gray} /></View>
          <DrawerItemText
          >
            About
          </DrawerItemText>
        </TouchableOpacity>
        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={() => this.clickOpenURL(feedbackURL)}>
          <View style={{ marginRight: 5 }}><Icon name="bullhorn" size={32} color={colours.gray} /></View>
          <DrawerItemText
          >
            Feedback
          </DrawerItemText>
        </TouchableOpacity>
        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={() => this.shareApp()}>
          <View style={{ marginRight: 5 }}><Icon name="share" size={32} color={colours.gray} /></View>
          <DrawerItemText
          >
            Refer a friend
          </DrawerItemText>
        </TouchableOpacity>
        <TouchableOpacity style={inlineStyles.DrawerItem} onPress={ () => handleLogOut(navigation) }>
          <View style={{ marginRight: 7 }}><Icon name="sign-out" size={32} color={colours.gray} /></View>
          <DrawerItemText
          >
            Signout
          </DrawerItemText>
        </TouchableOpacity>
        <View

          style={{
            paddingHorizontal: moderateScale(20),
            paddingBottom: moderateScale(15),
            paddingTop: moderateScale(20),
            marginTop: moderateScale(10),
            marginHorizontal: moderateScale(15),
            alignItems: 'center',
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: colours.lightgray,
            justifyContent: 'center'
          }}
        >
          <View style={{ marginRight: 7 }} />
          <TouchableOpacity onPress={() => this.clickOpenURL(PrivacyURL)}>
            <DrawerLinkText

            >
              Privacy policy
            </DrawerLinkText>
          </TouchableOpacity>
        </View>
        <View style={[inlineStyles.DrawerItem, { justifyContent: 'center' }]}>
          <View style={{ marginRight: 7 }} />
          <TouchableOpacity onPress={() => this.clickOpenURL(TermsURL)}>
            <DrawerLinkText

            >
              Terms and conditions
            </DrawerLinkText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


}
