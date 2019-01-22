import React from 'react';
import { Image, Text, View } from 'react-native';
// import { Header } from 'react-navigation';
import BannerBar from '../common/BannerBar';
import { ConfirmButton } from '../../../styles';
import colours from '../../../styles/colours';
import { GeneralText, ConfirmButtonText } from '../../../styles/text';
import { feedHorizPaddingScale, moderateScale } from '../../../styles/scaling';

const logo = require('../../../img/sparkLoginLogo.png');

// const HEADER_HEIGHT = Header.HEIGHT;
// const STATUSBAR_HEIGHT = StatusBar.HEIGHT;
Index.navigationOptions = () => {
  return {
    header: null
  };
};

export default function Index ({ navigation }) {

  const goToLogin = () => {

    console.log('go to login');
    navigation.navigate('login');
  };

  const goToSignup = () => {
    navigation.navigate('signup');
  };

  console.log('auth index render');

  return (
    <View testID="welcome" style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>

      <BannerBar />


      <View style={{ height: '20%' }} />
      <View style={{ justifyContent: 'center', alignItems: 'center', height: '20%', width: '100%', paddingHorizontal: feedHorizPaddingScale(10) }}>
        <Image style={{ width: '100%', height: '100%' }} source={ logo } />
      </View>
      <View style={{ height: '20%', justifyContent: 'center', marginBottom: 25 }}>
        <GeneralText style={{ textAlign: 'center', marginHorizontal: feedHorizPaddingScale(10) }}>
          The easy way to organise parties, events,
          share pictures and memories with friends, family and groups.
        </GeneralText>
      </View>
      <View style={{ flexDirection: 'row', height: '20%' }}>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, marginBottom: 40 }}
        >
          <ConfirmButton
            testID="log_in_button"
            style={{ backgroundColor: colours.green }}
            onPress={ goToLogin }
          >
            <ConfirmButtonText>
              LOG IN
            </ConfirmButtonText>
          </ConfirmButton>
          <View style={{ height: moderateScale(60), alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: colours.darkgray }}>
              OR
            </Text>
          </View>
          <ConfirmButton
            style={{ backgroundColor: colours.orange, borderColor: colours.orange }}
            onPress={ goToSignup }
          >
            <ConfirmButtonText>
              SIGN UP
            </ConfirmButtonText>
          </ConfirmButton>
        </View>
      </View>
    </View>
  );
}
