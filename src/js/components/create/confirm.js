import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import ConfirmWhat from './confirm-what';
import ConfirmWhere from './confirm-where';
import ConfirmWhen from './confirm-when';
import Button from '../common/Button';
import ImageHeader from '../common/ImageHeader';
import HeaderBack from '../common/CreateHeaderBackground';
import Spinner from '../common/Spinner';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import discardEvent from '../../lib/discard-event';
import ButtonHeader from '../common/ButtonHeader';
import CloseIcon from '../common/close-icon';
import { connectAlert } from '../Alert';

class Confirm extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerRight: <ButtonHeader
      onPress={ discardEvent } // don't duplicate on Press for icon and button - discard event vs navigationgoBack()
    >
      <CloseIcon navigation={navigation} />
    </ButtonHeader>,
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  });

  renderAlert = () => {
    setTimeout(() => {
      this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
    }, 2000);
  }

  render () {
    const { what, where, when, description, note, handleOnPress, isConnected, isFetching } = this.props;
    if (isFetching) {
      return <Spinner size="large" />;
    }
    return (
      <View
        style={[
          { backgroundColor: colours.white, flex: 1 }]}
      >
        <HeaderBack />
        <View>
          { !isConnected && this.renderAlert() }
          <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.msg4, { backgroundColor: colours.transparent, paddingBottom: 5 }]}>{ description }</Text>
              <Text style={[styles.msg4, { backgroundColor: colours.transparent, paddingBottom: 5 }]}>{ note }</Text>
            </View>
            <ConfirmWhat data={what} />
            <View style={{ backgroundColor: 'lightgray', height: 1, marginHorizontal: 5 }} />
            <ConfirmWhere data={where} />
            <View style={{ backgroundColor: 'lightgray', height: 1, marginHorizontal: 5 }} />
            <ConfirmWhen data={when} />

            <View style={[styles.rowCentered, { marginTop: 10 }]}>
              <Button
                buttonStyle={styles.confirmButton}
                textStyle={styles.confirmButtonText}
                onPress={ () => handleOnPress(this.props.navigation) }
              >
                Invite friends
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default connectAlert(Confirm);
