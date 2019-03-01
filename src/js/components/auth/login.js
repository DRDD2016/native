import React, { Component } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Fabric from 'react-native-fabric';
import { persistor } from '../../init-store';
import { FormTextInput, FormPasswordInput } from './form-components';
// import HeaderBack from '../common/CreateHeaderBackground';
import ButtonHeader from '../common/ButtonHeader';
import BannerBar from '../common/BannerBar';
import BackIcon from '../common/back-icon';
import Spinner from '../common/Spinner';
import { loginValidator as validate } from './form-validation';
import colours from '../../../styles/colours';
import { ConfirmButton, HeaderText, ModalView, ModalWrapper } from '../../../styles';
import { GeneralText, MessageText, ConfirmButtonText, ForgotPasswordText, ModalGeneralText, ModalMessageText } from '../../../styles/text';
import { feedVertPaddingScale, moderateScale } from '../../../styles/scaling';
// import { connectAlert } from '../Alert';

const { Answers } = Fabric;


class Login extends Component {


  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' },
    title: 'Login',
    headerLeft: <ButtonHeader onPress={() => navigation.goBack(null)}>
      <BackIcon />
    </ButtonHeader>,
    headerRight: <ButtonHeader />,
    headerStyle: { backgroundColor: colours.headerBackgroundColor },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <HeaderText>Login</HeaderText>
    </View>
  });

  constructor (props) {
    super(props);

    this.state = {
      isModalVisible: false
    };

  }

  componentWillMount () {
    persistor.pause();
  }

  componentDidMount () {
    Answers.logCustom('Login.js Mounted', { additionalData: 'nothing' });
  }

  componentWillUpdate (nextProps) {
    console.log('login WillUpdate');
    // console.log('nextProps', nextProps);
    const { isLoggingIn, serverError } = nextProps;

    if (!isLoggingIn && !serverError && this.state.isModalVisible) {
      this.setState({
        isModalVisible: false
      });
    } else if (isLoggingIn && !this.state.isModalVisible) {
      this.setState({
        isModalVisible: true
      });
    }

  }


  render () {

    const { handleSubmit, handleSubmitForm, handleResetLogin, isConnected, isLoggingIn, serverError, navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>

        <BannerBar />

        <View
          style={{
            flex: 1,
            backgroundColor: colours.white }}
        >
          <KeyboardAvoidingView
            style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}
            behavior="padding"
          >


            <Modal
              transparent
              animationType="slide"
              visible={this.state.isModalVisible}
              onRequestClose={() => {
                this.setState({
                  isModalVisible: false
                });
              }}
            >
              {
                <ModalWrapper>

                  {
                    !isLoggingIn && !serverError &&


                    <ModalView>
                      <GeneralText style={[{ color: colours.white, paddingVertical: 12 }]}>Not Logging in</GeneralText>
                      <MessageText style={[{ color: colours.lightgray, paddingVertical: 4 }]}>dont wait...</MessageText>

                      <Spinner size="large" />


                    </ModalView>
                  }

                  {
                    isLoggingIn && isConnected && !serverError &&
                    <ModalView>

                      <GeneralText style={[{ color: colours.white, paddingVertical: 12 }]}>Logging in</GeneralText>
                      <MessageText style={[{ color: colours.lightgray, paddingVertical: 4 }]}>please wait...</MessageText>

                      <Spinner size="large" />


                    </ModalView>
                  }

                  {
                    isLoggingIn && !isConnected &&
                    <ModalView>
                      <ModalGeneralText style={[{ color: colours.white, paddingVertical: 12 }]}>No internet connection</ModalGeneralText>
                      <ModalMessageText style={[{ color: colours.lightgray, paddingVertical: 4 }]}
                      >Make sure WiFi is turned on or try again later</ModalMessageText>

                      <ConfirmButton
                        style={{ backgroundColor: colours.green, borderColor: colours.green, borderWidth: 3, height: 60 }}
                        onPress={() => handleResetLogin()}
                      >

                        <ConfirmButtonText>OK</ConfirmButtonText>

                      </ConfirmButton>


                    </ModalView>
                  }

                  {

                    !isLoggingIn && serverError &&

                    <ModalView>
                      <ModalGeneralText style={[{ color: colours.white, paddingVertical: 12 }]}>{this.props.serverError}</ModalGeneralText>
                      <ModalMessageText
                        style={[{ color: colours.lightgray, paddingVertical: 4 }]}>Please enter correct login details</ModalMessageText>
                      <ModalMessageText style={[{ color: colours.lightgray, paddingVertical: 4 }]}>or Signup to register an account</ModalMessageText>

                      <ConfirmButton
                        style={{ backgroundColor: colours.green, borderColor: colours.green, borderWidth: 3, height: 60 }}
                        onPress={() => handleResetLogin()}
                      >
                        <ConfirmButtonText>OK</ConfirmButtonText>
                      </ConfirmButton>

                    </ModalView>
                  }

                </ModalWrapper>
              }


            </Modal>


            <View style={{ flexDirection: 'column', paddingHorizontal: 10, flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <View style={{
                flexDirection: 'row',
                marginVertical: 20,
                // height: 70,
                backgroundColor: 'transparent'
              }}>

                <View style={{
                  paddingBottom: feedVertPaddingScale(4), paddingHorizontal: moderateScale(10), flexDirection: 'column' }}>
                  <Field
                    name="email"
                    labelText="Email"
                    component={ FormTextInput }
                    isEmail
                    isLoginView
                    placeholder="joe.bloggs@example.com"
                    iconName="envelope-o"
                    focussedColor={ colours.main }
                    unfocussedColor={ colours.lightgray }
                  />
                </View>


              </View>
              <View style={{
                flexDirection: 'row',
                marginVertical: 20,
                // height: 70,
                backgroundColor: 'transparent'
              }}>

                <View style={{ paddingBottom: feedVertPaddingScale(4), paddingHorizontal: moderateScale(10), flexDirection: 'column' }}>
                  <Field
                    name="password"
                    labelText="Password"
                    component={ FormPasswordInput }
                    isLoginView
                    placeholder="password"
                    iconName="lock"
                    focussedColor={ colours.main }
                    unfocussedColor={ colours.lightgray }
                  />

                </View>
              </View>

              <View style={{ alignItems: 'center', marginTop: moderateScale(10), flexDirection: 'column' }}>
                <ConfirmButton
                  accessibilityLabel="LOG IN Submit"
                  activeOpacity={ 0.5 }
                  disabled={isLoggingIn}
                  onPress={handleSubmit(handleSubmitForm)}
                >
                  <ConfirmButtonText>LOG IN</ConfirmButtonText>
                </ConfirmButton>
                <TouchableOpacity
                  style={{ marginTop: moderateScale(10), paddingTop: moderateScale(10) }}
                  activeOpacity={ 0.5 }
                  onPress={() => navigation.navigate('confirmEmail')}
                >
                  <View>
                    <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'login', validate })(Login);
export default hoistNonReactStatic(decoratedComponent, Login);
// export default connectAlert(hoistNonReactStatic(decoratedComponent, Login));
