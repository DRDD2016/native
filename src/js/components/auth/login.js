import React, { Component } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, TouchableHighlight } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fabric from 'react-native-fabric';
import { persistor } from '../../init-store';
import { FormTextInput, FormPasswordInput } from './form-components';
import FeedHeader from '../common/FeedHeader';
import ButtonHeader from '../common/ButtonHeader';
import BackIcon from '../common/back-icon';
import ImageHeader from '../common/ImageHeader';
import Spinner from '../common/Spinner';
import { loginValidator as validate } from './form-validation';
import colours from '../../../styles/colours';
import styles from '../../../styles';
import { connectAlert } from '../Alert';

const { Answers } = Fabric;

const inlineStyles = {
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 5,
    // height: 70,
    backgroundColor: 'transparent'
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 20
  },
  iconWrap: {
    width: 40,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.blue
  },
  button: {
    backgroundColor: colours.blue,
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18
  },
  forgotPasswordText: {
    color: colours.blue,
    textAlign: 'center'
  }
};

class Login extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerLeft: <ButtonHeader onPress={() => navigation.goBack(null)}>
      <BackIcon />
    </ButtonHeader>,
    headerRight: <ButtonHeader />,
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
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
    console.log('nextProps', nextProps);
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

  renderAlert = () => {
    setTimeout(() => {
      this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
    }, 2000);
  }

  render () {

    const { handleSubmit, handleSubmitForm, handleResetLogin, isConnected, isLoggingIn, serverError, navigation } = this.props;

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
          <KeyboardAvoidingView
            style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 70 : 40 }}
            behavior="padding"
          >
            <View />

            <Modal
              transparent
              animationType={'slide'}
              visible={this.state.isModalVisible}
              onRequestClose={() => {
                this.setState({
                  isModalVisible: false
                });
              }}
            >
              {
                <View style={styles.modalWrapper}>

                  {
                    !isLoggingIn && !serverError &&


                    <View style={styles.modalConfirm}>

                      <Text style={[styles.msg1, { flex: 1 }]}>Not Logging in</Text>
                      <Text style={[styles.msg2, { flex: 1 }]}>dont wait...</Text>
                      <Spinner size="large" />
                      <View style={{ flex: 1 }} />

                    </View>
                  }

                  {
                    isLoggingIn && isConnected && !serverError &&
                    <View style={styles.modalConfirm}>

                      <Text style={[styles.msg1, { flex: 1 }]}>Logging in</Text>
                      <Text style={[styles.msg2, { flex: 1 }]}>please wait...</Text>
                      <Spinner size="large" />
                      <View style={{ flex: 1 }} />

                    </View>
                  }

                  {
                    isLoggingIn && !isConnected &&
                    <View style={styles.modalConfirm}>

                      <Text style={[styles.msg1, { flex: 1 }]}>No internet connection</Text>
                      <Text style={[styles.msg2, { flex: 1 }]}>Make sure WiFi is turned on or try again later</Text>
                      <View style={{ flex: 1 }}>
                        <TouchableHighlight
                          style={ [styles.confirmButton, { marginBottom: 20, marginTop: 20 }] }
                          onPress={() => handleResetLogin()}
                        >
                          <Text style={styles.confirmButtonText}>OK</Text>
                        </TouchableHighlight>
                      </View>

                    </View>
                  }

                  {

                    !isLoggingIn && serverError &&

                    <View style={styles.modalConfirm}>

                      <Text style={[styles.msg1, { flex: 1, color: 'red' }]}>{this.props.serverError}</Text>
                      <Text style={[styles.msg2, { flex: 1 }]}>Please enter correct login details</Text>
                      <Text style={[styles.msg2, { flex: 1 }]}>or Signup to register an account</Text>
                      <View style={{ flex: 1 }}>
                        <TouchableHighlight
                          style={ [styles.confirmButton, { marginBottom: 20, marginTop: 20 }] }
                          onPress={() => handleResetLogin()}
                        >
                          <Text style={styles.confirmButtonText}>OK</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  }

                </View>
              }


            </Modal>


            <View style={{ paddingHorizontal: 15, flex: 1 }}>
              <View style={inlineStyles.inputWrap}>
                <View style={inlineStyles.iconWrap}>
                  <Icon name="envelope-o" size={15} color="rgba(255, 255, 255, 0.76)" />
                </View>
                <Field
                  style={inlineStyles.input} name="email" component={ FormTextInput } isEmail isLoginView placeholder="email address"
                />
              </View>
              <View style={inlineStyles.inputWrap}>
                <View style={inlineStyles.iconWrap}>
                  <Icon name="lock" size={20} color="rgba(255, 255, 255, 0.76)" />
                </View>
                <Field
                  style={inlineStyles.input} name="password" component={ FormPasswordInput } isLoginView placeholder="password"
                />
              </View>

              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity
                  accessibilityLabel="LOG IN Submit"
                  activeOpacity={ 0.5 }
                  disabled={isLoggingIn}
                  onPress={handleSubmit(handleSubmitForm)}
                  style={styles.confirmButton}
                >
                  <Text style={styles.confirmButtonText}>LOG IN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginTop: 5, paddingTop: 10 }} activeOpacity={ 0.5 } onPress={() => navigation.navigate('confirmEmail')}
                >
                  <View>
                    <Text style={inlineStyles.forgotPasswordText}>Forgot Password?</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={inlineStyles.container} />
            <View style={{ height: 30 }} />
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'login', validate })(Login);
export default connectAlert(hoistNonReactStatic(decoratedComponent, Login));
