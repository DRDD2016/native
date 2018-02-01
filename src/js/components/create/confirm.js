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
import ButtonHeader from '../common/ButtonHeader';
import BackIcon from '../common/back-icon';
import CloseButton from '../common/CloseButton';
import { connectAlert } from '../Alert';
import mapToISOString from '../../lib/map-to-iso-string';

class Confirm extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerLeft: <ButtonHeader
      onPress={() => navigation.goBack(null)}
    >
      <BackIcon />
    </ButtonHeader>,
    headerRight: <CloseButton stack="ScreenCreate" nav={navigation} />,
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

    console.log('confirm Props', this.props);
    const { what, where, when, description, note, handleOnPress, isConnected, isFetching } = this.props;

    const iSODates = mapToISOString(when);
    const sortedDates = iSODates.sort((a, b) => {
      return (a) > (b);
    });

    console.log('confirm sortedDates: ', sortedDates);

    if (isFetching) {
      return <Spinner size="large" />;
    }
    return (
      <View
        style={[
          { backgroundColor: colours.white, flex: 1 }]}
      >
        <HeaderBack />
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
          <ConfirmWhen data={sortedDates} />

          <View style={[styles.rowCentered, { marginTop: 10 }]}>
            <Button
              buttonStyle={styles.confirmButton}
              textStyle={styles.confirmButtonText}
              onPress={ () => handleOnPress(this.props.navigation) }
            >
              Invite friends
            </Button>
          </View>
          <View style={[styles.rowCentered, { marginBottom: 30 }]} />
        </ScrollView>
      </View>
    );
  }
}

export default connectAlert(Confirm);
