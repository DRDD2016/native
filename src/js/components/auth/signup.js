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
import HeaderBack from '../common/CreateHeaderBackground';
import ButtonHeader from '../common/ButtonHeader';
import BackIcon from '../common/back-icon';
import { styles, HeaderText, ConfirmButtonText, SignupButton } from '../../../styles';
import colours from '../../../styles/colours';
// import { connectAlert } from '../Alert';

const { Answers } = Fabric;

class Signup extends Component {


  static navigationOptions = ({ navigation }) => ({
    title: 'Sign up',
    headerLeft: <ButtonHeader onPress={() => navigation.goBack(null)}>
      <BackIcon />
    </ButtonHeader>,
    headerRight: <ButtonHeader />,
    headerStyle: { borderTopWidth: 4, borderTopColor: colours.main, backgroundColor: colours.headerBackgroundColor, elevation: 0 },
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

  renderAlert = () => {
    setTimeout(() => {
      this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
    }, 2000);
  }

  renderButton = () => {
    const { handleSubmit, handleSubmitForm, isSigningUp } = this.props;
    if (isSigningUp) {
      return <Spinner size="large" />;
    }
    return (
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <SignupButton
          accessibilityLabel="SIGN UP Submit"
          activeOpacity={ 0.5 }
          disabled={isSigningUp}
          onPress={handleSubmit(handleSubmitForm)}
        >
          <ConfirmButtonText>SIGN UP</ConfirmButtonText>
        </SignupButton>

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
            <HeaderBack />
            <View style={{ flex: 1, justifyContent: 'center', marginBottom: 20 }}>
              <View style={{ marginTop: Platform.OS === 'ios' ? 0 : 80 }}>

                <View style={ [styles.row, { backgroundColor: 'transparent', marginBottom: 0, justifyContent: 'flex-end' }] }>
                  <Text>* Mandatory fields</Text>
                </View>

                <View style={ [styles.row, { marginHorizontal: 10, marginBottom: 0 }] }>
                  <Field name="firstname" component={ FormTextInput } placeholder="* First name" />
                </View>


                <View style={ [styles.row, { marginHorizontal: 10, marginBottom: 0 }] }>
                  <Field name="surname" component={ FormTextInput } placeholder="* Surname" />
                </View>


                <View style={ [styles.row, { marginHorizontal: 10, marginBottom: 0 }] }>
                  <Field name="email" component={ FormTextInput } placeholder="* Email" isEmail />
                </View>


                <View style={ [styles.row, { marginHorizontal: 10, marginBottom: 0 }] }>
                  <Field name="password" component={ FormPasswordInput } placeholder="* Password" />
                </View>

                <View style={ [styles.row, { marginHorizontal: 10 }] }>
                  <Field name="confirmPassword" component={ FormPasswordInput } placeholder="* Confirm password" />
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
