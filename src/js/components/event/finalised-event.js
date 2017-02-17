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

const STATUS_GOING = 'going';
const STATUS_MAYBE = 'maybe';
const STATUS_NOT_GOING = 'not_going';

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

const FinalisedEvent = ({ event, userIsHost, rsvpToEvent, rsvps }) => {
  const handleClick = !userIsHost ? rsvpToEvent : '';
  return (
    <View style={{ flex: 1 }}>
      { userIsHost ? <Text>Host view</Text> : <Text>Invitee view</Text> }
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
                onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_GOING) }
              >
                <Text>Going</Text>
              </Button>
              {
                rsvps.going && rsvps.going.map((invitee) => {
                  return (
                    <InviteeCard firstname={invitee.firstname} photo_url={invitee.photo_url} />
                  );
                })
              }
            </View>
            <View style={ inlineStyle.column }>
              <Button
                buttonStyle={[styles.confirmButton, inlineStyle.button, inlineStyle.orangeButton]}
                textStyle={styles.confirmButtonText}
                onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_MAYBE) }
              >
                <Text>Maybe</Text>
              </Button>
              {
                rsvps.maybe && rsvps.maybe.map((invitee) => {
                  return (
                    <InviteeCard firstname={invitee.firstname} photo_url={invitee.photo_url} />
                  );
                })
              }
            </View>
            <View style={ [inlineStyle.column, { flexGrow: 0.5 }] }>
              <Button
                buttonStyle={[styles.confirmButton, inlineStyle.button, inlineStyle.redButton]}
                textStyle={styles.confirmButtonText}
                onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_NOT_GOING) }
              >
                <Text>Not Going</Text>
              </Button>
              {
                rsvps.not_going && rsvps.not_going.map((invitee) => {
                  return (
                    <InviteeCard firstname={invitee.firstname} photo_url={invitee.photo_url} />
                  );
                })
              }
            </View>
          </View>
          <Text>Not responded</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {
              rsvps.not_responded.map((invitee) => {
                return (
                  <InviteeCard
                    firstname={ invitee.firstname }
                    photo_url={ invitee.photo_url }
                  />
                );
              })
            }
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default FinalisedEvent;
