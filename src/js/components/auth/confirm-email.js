import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { emailValidator as validate } from './form-validation';
import { FormTextInput } from './form-components';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import styles from '../../../styles';
import colours from '../../../styles/colours';
// import { connectAlert } from '../Alert';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Fabric from 'react-native-fabric';
// import FeedHeader from '../common/FeedHeader';
import ButtonHeader from '../common/ButtonHeader';
import FeedHeader from '../common/FeedHeader';
import BackIcon from '../common/back-icon';
import ImageHeader from '../common/ImageHeader';

const inlineStyle = {
  buttonStyle: {
    backgroundColor: colours.blue,
    flex: 1,
    paddingVertical: 15,
    marginVertical: 15,
    borderRadius: 5
  },
  labelStyle: {
    alignSelf: 'flex-start',
    paddingLeft: 10
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff'
  }
};

class ConfirmEmail extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Forgot your password?',
    headerLeft: <ButtonHeader onPress={() => navigation.goBack(null)}>
      <BackIcon />
    </ButtonHeader>,
    headerRight: <ButtonHeader />,
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  });

  renderServerError = () => {
    if (this.props.confirmEmailError) {
      return <Text style={{ color: 'red' }}>{ this.props.confirmEmailError }</Text>;
    }
  }

  renderServerMessage = () => {
    if (this.props.message) {
      return <Text style={{ color: 'green' }}>{ this.props.message }</Text>;
    }
  }

  renderButton = () => {
    const { handleSubmit, handleSubmitForm, isConfirming } = this.props;
    if (isConfirming) {
      return <Spinner size="large" />;
    }
    return (
      <Button
        buttonStyle={inlineStyle.buttonStyle}
        textStyle={inlineStyle.textStyle}
        onPress={handleSubmit(handleSubmitForm)}
      >
        <Text>RESET PASSWORD</Text>
      </Button>
    );
  };


  render () {
    return (
      <View style={{ flex: 1, backgroundColor: colours.white }}>
        <FeedHeader>
          { !this.props.isConnected && this.renderAlert() }
        </FeedHeader>
        <View style={{ alignItems: 'center', marginHorizontal: 10, marginTop: 50, marginBottom: 70 }}>
          <Text style={styles.msg3}>Please enter the email address you used to register and we will send an email link to reset your password</Text>
          { this.renderServerMessage() }
        </View>
        <View style={ styles.container }>
          <Text style={inlineStyle.labelStyle}>Email address:</Text>
          <View style={ styles.row }>
            <Field name="email" component={ FormTextInput } isEmail />
          </View>
          { this.renderServerError() }
          <View style={ styles.row }>
            { this.renderButton() }
          </View>
        </View>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'confirmEmail', validate })(ConfirmEmail);
export default hoistNonReactStatic(decoratedComponent, ConfirmEmail);
// export default connectAlert(hoistNonReactStatic(decoratedComponent, ConfirmEmail));
