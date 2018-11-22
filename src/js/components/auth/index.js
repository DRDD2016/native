import React from 'react';
import { Image, Text, View } from 'react-native';
// import { Header } from 'react-navigation';
import BannerBar from '../common/BannerBar';
import { ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';

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
    navigation.navigate('login');
  };

  const goToSignup = () => {
    navigation.navigate('signup');
  };

  return (
    <View testID="welcome" style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>

      <BannerBar />


      <View style={{ flex: 0.2 }} />
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.2 }}>
        <Image style={{ height: 100, width: 300 }} source={ logo } />
      </View>
      <View style={{ flex: 0.15, justifyContent: 'center', marginBottom: 25 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#a39b9b', textAlign: 'center', marginHorizontal: 10 }}>
          The easy way to organise parties, events,
          share pictures and memories with friends, family and groups.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', flex: 0.3 }}>
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
          <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
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
