import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import ConfirmWhat from './confirm-what';
import ConfirmWhere from './confirm-where';
import ConfirmWhen from './confirm-when';
import BannerBar from '../common/BannerBar';
// import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { styles, Msg1, HeaderText, ConfirmButton, ConfirmButtonText, ButText } from '../../../styles';
import colours from '../../../styles/colours';
import ButtonHeader from '../common/ButtonHeader';
import BackIcon from '../common/back-icon';
import MessageBubble from '../common/messageBubble';
import CloseButton from '../common/CloseButton';
// import { connectAlert } from '../Alert';
import mapToISOString from '../../lib/map-to-iso-string';

class Confirm extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' }, // workaround to remove padding at top of header
    headerLeft: <ButtonHeader
      onPress={() => navigation.goBack(null)}
    >
      <BackIcon />
    </ButtonHeader>,
    headerRight: <CloseButton stack="ScreenCreate" nav={navigation} />,
    headerStyle: { backgroundColor: colours.headerBackgroundColor, elevation: 0 },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <HeaderText>Check your invite</HeaderText>
    </View>
  });


  render () {

    console.log('confirm Props', this.props);
    const { name, firstname, what, where, when, description, note, handleOnPress, photo_url, isFetching } = this.props;

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
        <BannerBar />

        <ScrollView>

          <View style={{ flexDirection: 'column', alignItems: 'center', paddingHorizontal: 4 }}>
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Msg1>{name}</Msg1>
            </View>
            {
              <View style={{ width: '100%', justifyContent: 'flex-start' }}>
                <View style={{ backgroundColor: colours.spacerColour, height: 1, marginHorizontal: 4 }} />
                <View style={{ paddingVertical: 4 }}>
                  <Text style={{ textAlign: 'center', color: colours.main }}>Description</Text>
                  <ButText style={{
                    textAlign: 'center',
                    color: description ? colours.gray : colours.lightgray,
                    paddingTop: 4,
                    paddingHorizontal: 10 }}>
                    { description && description }
                    { !description && 'no description' }
                  </ButText>
                </View>
              </View>
            }


          </View>
          <View style={{ backgroundColor: colours.spacerColour, height: 1, marginHorizontal: 4 }} />
          <View style={{ marginVertical: 4, justifyContent: 'center' }}>
            <View style={{ marginHorizontal: 4 }}>
              <Text style={{ textAlign: 'center', color: colours.main }}>
                What
              </Text>
            </View>
            <ConfirmWhat data={what} />
          </View>
          <View style={{ backgroundColor: colours.spacerColour, height: 1, marginHorizontal: 4 }} />
          <View style={{ marginVertical: 4, justifyContent: 'center' }}>
            <View style={{ marginHorizontal: 4 }}>
              <Text style={{ textAlign: 'center', color: colours.main }}>
                Where
              </Text>
            </View>
            <ConfirmWhere data={where} />
          </View>
          <View style={{ backgroundColor: colours.spacerColour, height: 1, marginHorizontal: 4 }} />
          <View style={{ marginVertical: 4, justifyContent: 'center' }}>
            <View style={{ marginHorizontal: 4 }}>
              <Text style={{ textAlign: 'center', color: colours.main }}>
                When
              </Text>
            </View>
            <ConfirmWhen data={sortedDates} />
          </View>
          <View style={{ backgroundColor: colours.spacerColour, height: 1, marginHorizontal: 4 }} />

          <View style={[styles.rowCentered, { marginTop: 10 }]}>
            <ConfirmButton
              onPress={ () => handleOnPress(this.props.navigation) }
            >
              <ConfirmButtonText>
              Invite friends
              </ConfirmButtonText>
            </ConfirmButton>
          </View>

          <View style={{ marginTop: 10, backgroundColor: colours.spacerColour, height: 1, marginHorizontal: 4 }} />

          {
            (note.trim() !== '') &&
            <View style={{
              marginTop: 10,
              paddingLeft: 4 }}
            >
              <Text style={{ textAlign: 'center', color: colours.main }}>Messages</Text>
            </View>
          }

          {
            (note.trim() !== '') &&

            <MessageBubble messageText={note} messageDate="13 Dec" messageDirection="left" photo_url={photo_url} sender={firstname} />

          }


          <View style={[styles.rowCentered, { marginBottom: 30 }]} />
        </ScrollView>
      </View>
    );
  }
}

// export default connectAlert(Confirm);
export default Confirm;
