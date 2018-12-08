import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Fabric from 'react-native-fabric';
import { persistor } from '../../init-store';
import { FormTextInput, FormPasswordInput } from './form-components';
import { signupValidator as validate } from './form-validation';
import Spinner from '../common/Spinner';
import BannerBar from '../common/BannerBar';
// import HeaderBack from '../common/CreateHeaderBackground';
import ButtonHeader from '../common/ButtonHeader';
import BackIcon from '../common/back-icon';
import { styles, HeaderText, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';
// import { connectAlert } from '../Alert';

const { Answers } = Fabric;

class Signup extends Component {


  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' }, // workaround to remove padding at top of header
    title: 'Sign up',
    headerLeft: <ButtonHeader onPress={() => navigation.goBack(null)}>
      <BackIcon />
    </ButtonHeader>,
    headerRight: <ButtonHeader />,
    headerStyle: { backgroundColor: colours.headerBackgroundColor, elevation: 0 },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <HeaderText>Sign up</HeaderText>
    </View>
  });

  componentWillMount () {
    persistor.pause();
  }

  componentDidMount () {
    Answers.logCustom('Signup.js Mounted', { additionalData: 'nothing' });
  }


  renderButton = () => {
    const { handleSubmit, handleSubmitForm, isSigningUp } = this.props;
    if (isSigningUp) {
      return <View style={{ justifyContent: 'center', alignItems: 'center' }}><Spinner size="large" /></View>;
    }
    return (
      <View style={{ alignItems: 'center', marginTop: 8 }}>
        <ConfirmButton
          testID="sign up_button"
          style={{ backgroundColor: colours.orange, borderColor: colours.orange }}
          accessibilityLabel="SIGN UP Submit"
          activeOpacity={ 0.5 }
          disabled={isSigningUp}
          onPress={handleSubmit(handleSubmitForm)}
        >
          <ConfirmButtonText>SIGN UP</ConfirmButtonText>
        </ConfirmButton>

      </View>

    );
  };

  renderServerError = () => {
    if (this.props.serverError) {
      return (
        <View style={ styles.row }>
          <Text style={{ color: 'red' }}>{this.props.serverError}</Text>
        </View>
      );
    }
  }

  render () {


    return (
      <View style={{ flex: 1 }}>

        <BannerBar />
        <View
          style={{
            flex: 1,
            backgroundColor: colours.white,
            borderBottomWidth: 1,
            borderBottomColor: colours.lightgray }}
        >
          <KeyboardAwareScrollView
            style={[
              styles.headerBuffer,
              { backgroundColor: colours.white }]}
            enableOnAndroid
            resetScrollToCoords={{ x: 0, y: 0 }}
          >

            <View style={{ flex: 1, justifyContent: 'center', marginBottom: 20 }}>
              <View style={{ marginTop: Platform.OS === 'ios' ? 0 : 80 }}>

                <View style={{ flexDirection: 'row', paddingBottom: 4, paddingTop: 8, paddingRight: 4, backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'center' }} // eslint-disable-line max-len
                >
                  <Text>* Mandatory fields</Text>
                </View>

                <View style={{ paddingVertical: 4, paddingHorizontal: 10 }}>
                  <Field
                    name="firstname"
                    labelText="First name"
                    component={ FormTextInput }
                    placeholder="Joe"
                    focussedColor={ colours.main }
                    unfocussedColor={ colours.lightgray }
                  />


                </View>


                <View style={{ paddingVertical: 4, paddingHorizontal: 10 }}>
                  <Field
                    name="surname"
                    labelText="Surname"
                    component={ FormTextInput }
                    placeholder="Bloggs"
                    focussedColor={ colours.main }
                    unfocussedColor={ colours.lightgray }
                  />

                </View>


                <View style={{ paddingVertical: 4, paddingHorizontal: 10 }}>
                  <Field
                    name="email"
                    labelText="Email *"
                    component={ FormTextInput }
                    placeholder="eg. joebloggs@example.com"
                    focussedColor={ colours.main }
                    unfocussedColor={ colours.lightgray }
                    isEmail
                  />
                </View>


                <View style={{ paddingVertical: 4, paddingHorizontal: 10 }}>
                  <Field
                    name="password"
                    labelText="Password"
                    component={ FormPasswordInput }
                    placeholder=""
                    focussedColor={ colours.main }
                    unfocussedColor={ colours.lightgray }
                  />
                </View>

                <View style={{ paddingVertical: 4, paddingHorizontal: 10 }}>
                  <Field
                    name="confirmPassword"
                    labelText="Confirm Password"
                    component={ FormPasswordInput }
                    placeholder=""
                    focussedColor={ colours.main }
                    unfocussedColor={ colours.lightgray }
                  />
                </View>

                { this.renderServerError() }
                { this.renderButton() }
              </View>
            </View>
            <View style={{ height: 30 }} />

          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'signup', validate })(Signup);
export default hoistNonReactStatic(decoratedComponent, Signup);
// export default connectAlert(hoistNonReactStatic(decoratedComponent, Signup));
