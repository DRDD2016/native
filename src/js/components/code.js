import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Field, reduxForm } from 'redux-form';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { FormTextInput } from './auth/form-components';
import { codeValidator as validate } from './auth/form-validation';
import Button from './common/Button';
import Spinner from './common/Spinner';
import FeedHeader from './common/FeedHeader';
import ImageHeader from './common/ImageHeader';
import styles from '../../styles';
import colours from '../../styles/colours';
import { connectAlert } from './Alert';

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

class Code extends Component {

  static navigationOptions = {
    title: 'Enter Your Event Code',
    tabBarLabel: 'RSVP',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="barcode" size={32} color={tintColor} />,
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  }


  renderButton = () => {
    const { handleSubmit, handleSubmitForm, isFetching } = this.props;
    if (isFetching) {
      return <Spinner size="large" />;
    }
    return (
      <View style={styles.row}>
        <Button
          buttonStyle={[
            styles.confirmButton,
            { backgroundColor: colours.purple,
              borderColor: colours.purple,
              marginTop: 2,
              flex: 1 }]}
          textStyle={ styles.confirmButtonText }
          onPress={handleSubmit(handleSubmitForm)}
        >
          <Text>Join Event</Text>
        </Button>
      </View>
    );
  };

  renderAlert = () => {
    setTimeout(() => {
      this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
    }, 2000);
  }

  render () {
    // console.log('code RenderProps', this.props);
    const { codeError, isConnected } = this.props;

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

          <View style={{ alignItems: 'center', marginHorizontal: 10, marginTop: Platform.OS === 'ios' ? 70 : 40, marginBottom: 60 }}>
            <Text style={styles.msg3}>
              If your friend has sent you a code to join their event, enter the code below to respond to their invitation.
            </Text>
          </View>
          <View style={ styles.container }>
            <Text style={inlineStyle.labelStyle}>Event Code:</Text>
            <View style={ styles.row }>
              <Field
                style={styles.input}
                name="code"
                component={ FormTextInput }
                placeholder={ 'Enter code here' }
              />
            </View>
            { this.renderButton() }

            {
              codeError &&
              <Text style={{ color: 'red' }}>{ codeError }</Text>
            }
          </View>
        </View>
      </View>
    );
  }
}

const decoratedComponent = reduxForm({ form: 'code', validate })(Code);
export default connectAlert(hoistNonReactStatic(decoratedComponent, Code));
