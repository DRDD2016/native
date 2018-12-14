import React, { Component } from 'react';
import { View, Text, Platform, Image } from 'react-native';
import Fabric from 'react-native-fabric';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Field, reduxForm } from 'redux-form';
import { Header } from 'react-navigation';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FormTextInput } from './auth/form-components';
import { codeValidator as validate } from './auth/form-validation';
import BannerBar from './common/BannerBar';
import ButtonHeader from './common/ButtonHeader';
import BurgerIcon from './common/burger-icon';
import OfflineIconContainer from '../containers/common/OfflineIconContainer';
import Spinner from './common/Spinner';
import { ConfirmButton, ConfirmButtonText } from '../../styles';
import colours from '../../styles/colours';
import { GeneralText, MessageText } from '../../styles/text';
// import { connectAlert } from './Alert';

const { Answers } = Fabric;

const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.6 : Header.HEIGHT * 0.6;
const logo = require('../../img/sparkLoginLogo.png');

// const inlineStyle = {
//   buttonStyle: {
//     backgroundColor: colours.blue,
//     flex: 1,
//     paddingVertical: 15,
//     marginVertical: 15,
//     borderRadius: 5
//   },
//   labelStyle: {
//     alignSelf: 'flex-start',
//     paddingLeft: 10
//   },
//   textStyle: {
//     alignSelf: 'center',
//     color: '#fff'
//   }
// };

class Code extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' }, // workaround to remove padding at top of header
    headerLeft: <View style={{ paddingLeft: 1, alignItems: 'center', flex: 1 }}>
      <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />
    </View>,
    headerRight: <View style={{ flexDirection: 'row', alignItems: 'center' }}>

      <OfflineIconContainer />
      <ButtonHeader
        onPress={() => navigation.openDrawer()}
      >
        <BurgerIcon />
      </ButtonHeader>
    </View>,
    headerStyle: {

      paddingBottom: 0,
      backgroundColor: colours.headerBackgroundColor
      // elevation: 1,
      // shadowOpacity: 0.8,
      // shadowRadius: 1,
      // shadowColor: 'gray',
      // shadowOffset: { height: 1, width: 0 }
    },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor
  });
  // static navigationOptions = {
  //   title: 'Enter Your Event Code',
  //   tabBarLabel: 'Join',
  //   tabBarIcon: ({ tintColor }) =>
  //     <Icon name="barcode" size={32} color={tintColor} />,
  //   headerStyle: { backgroundColor: colours.headerBackgroundColor },
  //   headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
  //   headerTintColor: colours.headerButtonColor,
  //   headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
  //     <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />
  //   </View>
  // }

  componentDidMount () {
    Answers.logCustom('Code.js Mounted', { additionalData: 'nothing' });
  }


  renderButton = () => {
    const { handleSubmit, handleSubmitForm, isFetching } = this.props;
    if (isFetching) {
      return <Spinner size="large" />;
    }
    return (

      <ConfirmButton
        style={{ marginTop: 20, backgroundColor: colours.main, borderColor: colours.main }}
        onPress={handleSubmit(handleSubmitForm)}
      >
        <ConfirmButtonText>Join Event</ConfirmButtonText>
      </ConfirmButton>

    );
  };


  render () {
    console.log('renderCode');

    const { codeError } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <BannerBar />
        <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: colours.white }}
          enableOnAndroid
          extraHeight={80}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
        >

          <View
            style={{ flex: 1, backgroundColor: colours.transparent }}
          >

            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

              <GeneralText style={{ marginTop: 50, marginHorizontal: 15 }}>
                RSVP to a friend
              </GeneralText>

              <MessageText style={{ fontWeight: '600', textAlign: 'center', paddingTop: 20, paddingBottom: 10, marginHorizontal: 15 }} // eslint-disable-line max-len
              >
                If your friend has sent you a code to join their event, enter the code below to respond to their invitation.
              </MessageText>

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Field

                  name="code"
                  component={ FormTextInput }
                  placeholder="eg. XXXXXXXX"
                  labelText="Enter code"
                  labelType="notPoll"
                  focussedColor={ colours.main }
                  unfocussedColor={ colours.lightgray }

                />


              </View>
              <View>

                { this.renderButton() }

                {
                  codeError &&
                  <Text style={{ color: 'red' }}>{ codeError }</Text>
                }
              </View>
              <View style={{ height: 80 }} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'code', validate })(Code);
export default hoistNonReactStatic(decoratedComponent, Code);
// export default connectAlert(hoistNonReactStatic(decoratedComponent, Code));
