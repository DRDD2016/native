import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Fabric from 'react-native-fabric';
import { persistor } from '../../init-store';
import { FormTextInput, FormPasswordInput } from './form-components';
import { signupValidator as validate } from './form-validation';
import Spinner from '../common/Spinner';
import Button from '../common/Button';
import FeedHeader from '../common/FeedHeader';
import ButtonHeader from '../common/ButtonHeader';
import BackIcon from '../common/back-icon';
import ImageHeader from '../common/ImageHeader';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import { connectAlert } from '../Alert';

const { Answers } = Fabric;

class Signup extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Sign up',
    headerLeft: <ButtonHeader onPress={() => navigation.goBack(null)}>
      <BackIcon />
    </ButtonHeader>,
    headerRight: <ButtonHeader />,
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  });

  componentWillMount () {
    persistor.pause();
  }

  componentDidMount () {
    Answers.logCustom('Visited SignUpScreen', { additionalData: 'nothing' });
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
        <Button
          buttonStyle={ [styles.confirmButton, { backgroundColor: colours.orange, borderColor: colours.orange }] }
          textStyle={ styles.confirmButtonText }
          onPress={handleSubmit(handleSubmitForm)}
        >
          <Text>SIGN UP</Text>
        </Button>
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

    const { isConnected } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FeedHeader>
          { !isConnected && this.renderAlert() }
        </FeedHeader>
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
              <View style={{ marginTop: 80 }}>

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
export default connectAlert(hoistNonReactStatic(decoratedComponent, Signup));
