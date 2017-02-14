/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import FinalisedWhat from '../create/confirm-what';
import FinalisedWhere from '../create/confirm-where';
import FinalisedWhen from '../create/confirm-when';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';
import Button from '../common/Button';
import InviteeCard from './invitee-card';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const inlineStyle = {
  button: {
    flexBasis: 100,
    fontSize: 16,
    paddingHorizontal: 8,
    marginBottom: 4
  },
  orangeButton: {
    backgroundColor: colours.orange,
    borderColor: colours.orange
  },
  redButton: {
    flexBasis: 100,
    fontSize: 16,
    paddingHorizontal: 5,
    // marginBottom: 5,
    backgroundColor: colours.red,
    borderColor: colours.red
  },
  column: {
    margin: 5,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
};

const FinalisedEvent = ({ event, event_id, userIsHost, rsvpToEvent, rsvps }) => {
  const handleClick = !userIsHost ? rsvpToEvent : '';

  const going = rsvps.going;
  const notGoing = rsvps.not_going;
  const maybe = rsvps.maybe;
  const respondedList = going.concat(maybe, notGoing);
  const placeNameLong = (event.where[0] && event.where[0].placeName > 18);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignSelf: 'flex-start' }}>
            <Image source={require('../../../img/avatar.png')} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
          </View>
          <View style={{ alignSelf: 'center', marginHorizontal: 10 }}>
            <Text>{event.description}</Text>
            <Text>{ event.note }</Text>
          </View>
        </View>

        <FinalisedWhat data={ event.what } />
        <FinalisedWhere data={ event.where } />
        <FinalisedWhen data={ event.when } />

        <View style={{ marginTop: 10, borderTopColor: '#efefef', borderTopWidth: 1 }}>
          <Text style={{ margin: 10, fontSize: 16 }}>RSVPs</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={ inlineStyle.column }>
              <Button
                buttonStyle={[styles.confirmButton, inlineStyle.button, inlineStyle.greenButton]}
                textStyle={styles.confirmButtonText}
                onPress={ () => handleClick('going', event_id) }
              >
                <Text>Going</Text>
              </Button>
              {
                going && going.map((user) => {
                  return (
                    <InviteeCard firstname={user.firstname} photo_url={user.photo_url} />
                  );
                })
              }
            </View>
            <View style={ inlineStyle.column }>
              <Button
                buttonStyle={[styles.confirmButton, inlineStyle.button, inlineStyle.orangeButton]}
                textStyle={styles.confirmButtonText}
                onPress={ () => handleClick('maybe', event_id) }
              >
                <Text>Maybe</Text>
              </Button>
              {
                maybe && maybe.map((user) => {
                  return (
                    <InviteeCard firstname={user.firstname} photo_url={user.photo_url} />
                  );
                })
              }
            </View>
            <View style={ [inlineStyle.column, { flexGrow: 0.5 }] }>
              <Button
                buttonStyle={[styles.confirmButton, inlineStyle.button, inlineStyle.redButton]}
                textStyle={styles.confirmButtonText}
                onPress={ () => handleClick('notGoing', event_id) }
              >
                <Text>Not Going</Text>
              </Button>
              {
                notGoing && notGoing.map((user) => {
                  return (
                    <InviteeCard firstname={user.firstname} photo_url={user.photo_url} />
                  );
                })
              }
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );

};

export default FinalisedEvent;
