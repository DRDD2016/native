import React from 'react';
import { View, Linking, ScrollView } from 'react-native';
// import Router from '../../router';
import ConfirmEventWhat from './confirm-what';
import ConfirmEventWhere from './confirm-where';
import ConfirmEventWhen from './confirm-when';
import EventDetailsHeader from '../general/event-details-header';
import styles from '../../../styles';
import Button from '../common/Button';

export default function Confirm ({ data, name, description, note, where, saveEvent, navigation }) { // eslint-disable-line

  // const nextPage = () => {
  //   navigation.performAction(({ tabs, stacks }) => {
  //     tabs('main').jumpToTab('feed');
  //     stacks('confirm').immediatelyResetStack([Router.getRoute('feed')], 0);
  //   });
  // };

  const url = 'whatsapp://send?text=Hello%20from%20Spark!';
  const openWhatsapp = () => {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
      }
      return Linking.openURL(url);
    }).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.rowEventDetailsHeader}>
          <EventDetailsHeader
            location="Enter details"
            name={ name }
            description={ description }
          />
        </View>
        <ConfirmEventWhat eventWhat={{ name, description }} />
        <ConfirmEventWhere eventWhere={ where } />
        <ConfirmEventWhen eventWhen={ data } />
        <View style={styles.rowCentered}>
          <Button
            buttonStyle={styles.confirmButton}
            textStyle={styles.confirmButtonText}
            onPress={ openWhatsapp }
          >
            Invite friends
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
