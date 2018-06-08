import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import ConfirmWhat from './confirm-what';
import ConfirmWhere from './confirm-where';
import ConfirmWhen from './confirm-when';
// import Button from '../common/Button';
import ImageHeader from '../common/ImageHeader';
import HeaderBack from '../common/CreateHeaderBackground';
import Spinner from '../common/Spinner';
import { styles, ConfirmButton, ConfirmButtonText, ButText } from '../../../styles';
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
    const avatar = require('../../../img/avatar.png');
    console.log('confirm Props', this.props);
    const { what, where, when, description, note, handleOnPress, photo_url, isConnected, isFetching } = this.props;

    const iSODates = mapToISOString(when);
    const sortedDates = iSODates.sort((a, b) => {
      return (a) > (b);
    });

    console.log('confirm sortedDates: ', sortedDates);

    if (isFetching) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}><Spinner size="large" /></View>
      );
    }
    return (
      <View
        style={[
          { backgroundColor: colours.white, flex: 1 }]}
      >
        <HeaderBack />
        { !isConnected && this.renderAlert() }
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Text style={[styles.msg3, { backgroundColor: colours.transparent, paddingBottom: 5 }]}>{ description }</Text>

          </View>
          <View style={{ backgroundColor: colours.spacerColour, height: 1, marginHorizontal: 5 }} />
          <View style={{ marginVertical: 2, justifyContent: 'center' }}>
            <ConfirmWhat data={what} />
          </View>
          <View style={{ backgroundColor: colours.spacerColour, height: 1, marginHorizontal: 5 }} />
          <View style={{ marginVertical: 2, justifyContent: 'center' }}>
            <ConfirmWhere data={where} />
          </View>
          <View style={{ backgroundColor: colours.spacerColour, height: 1, marginHorizontal: 5 }} />
          <View style={{ marginVertical: 2, justifyContent: 'center' }}>
            <ConfirmWhen data={sortedDates} />
          </View>
          <View style={{ backgroundColor: colours.spacerColour, height: 1, marginHorizontal: 5 }} />


          {
            (note.trim() !== '') &&
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 15,
                backgroundColor: colours.lightgray,
                paddingHorizontal: 5,
                paddingVertical: 5,
                marginTop: 10,
                marginHorizontal: 5,
                justifyContent: 'space-between',
                alignItems: 'flex-start' }}
            >
              <View style={{ flex: 1, marginHorizontal: 5, backgroundColor: 'transparent' }}>
                <ButText color={colours.blue}>{ note }</ButText>
              </View>
              <View style={{ backgroundColor: colours.white, borderRadius: 15, padding: 1 }}>
                <Image
                  source={{ uri: photo_url }}
                  defaultSource={avatar}
                  style={[styles.uiProfilePhotoCircularImage, { }]}
                />
              </View>

            </View>
          }

          <View style={[styles.rowCentered, { marginTop: 10 }]}>
            <ConfirmButton
              onPress={ () => handleOnPress(this.props.navigation) }
            >
              <ConfirmButtonText>
              Invite friends
              </ConfirmButtonText>
            </ConfirmButton>
          </View>
          <View style={[styles.rowCentered, { marginBottom: 30 }]} />
        </ScrollView>
      </View>
    );
  }
}

export default connectAlert(Confirm);
