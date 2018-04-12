/* eslint-disable arrow-body-style */
import React from 'react';
import { View, Image, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import FinalisedWhat from '../create/confirm-what';
import FinalisedWhere from '../create/confirm-where';
import FinalisedWhen from '../create/confirm-when';
import Button from '../common/Button';
import EditIcon from '../common/edit-icon';
import InviteeCard from './invitee-card';
import { styles, ButText, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';

const STATUS_GOING = 'going';
const STATUS_MAYBE = 'maybe';
const STATUS_NOT_GOING = 'not_going';
const avatar = require('../../../img/avatar.png');

const inlineStyle = {
  RSVPButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.confirm,
    borderColor: colours.confirm,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginHorizontal: 5
  },
  RSVPTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 5
  },
  RSVPButtonText: {
    fontSize: 16,
    color: colours.white
  },
  RSVPTitleText: {
    fontSize: 12,
    fontWeight: '600'
  },
  orangeButton: {
    backgroundColor: colours.orange,
    borderColor: colours.orange
  },
  redButton: {
    backgroundColor: colours.red,
    borderColor: colours.red
  },
  column: {
    flex: 1,
    padding: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
};

const FinalisedEvent = ({ event, userIsHost, isPoll, rsvpToEvent, rsvps, handleEdit, handleInviteMoreFriends }) => {

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

        <Image
          source={{ uri: event.host_photo_url }} style={{ borderRadius: 15,
            marginLeft: 5,
            width: Header.HEIGHT,
            height: Header.HEIGHT,
            resizeMode: 'contain' }}
        />

        { userIsHost ?
          <View style={{ flex: 1 }}>
            <Text style={{ alignSelf: 'center' }}>You are hosting</Text>
            <Text style={[styles.msg1, { alignSelf: 'center' }]}>{event.name}</Text>
          </View>
          :
          <View style={{ backgroundColor: 'red', flex: 1 }}>
            <Text style={{ alignSelf: 'center' }}>You have been invited to</Text>
            <Text style={[styles.msg1, { alignSelf: 'center' }]}>{event.name}</Text>
            <Text style={{ alignSelf: 'center' }}>please RSVP</Text>
          </View>
        }

        { userIsHost ?
          null
          :
          <View style={{ width: Header.HEIGHT, height: Header.HEIGHT }} />
        }

        { userIsHost && !isPoll ?
          <TouchableHighlight
            onPress={ () => handleEdit(event) }
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: Header.HEIGHT,
              height: Header.HEIGHT
            }}
          >
            <View>
              <EditIcon />
            </View>
          </TouchableHighlight>
          : null
        }

      </View>

      <ScrollView>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, alignSelf: 'center', marginVertical: 10, marginHorizontal: 10 }}>
            <View>
              <Text style={[styles.msg3, { alignSelf: 'center' }]}>{event.description}</Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: colours.sectionBorder, height: 1, marginHorizontal: 5 }} />
        <View style={{ height: 30, justifyContent: 'center' }}>
          <FinalisedWhat data={ event.what } />
        </View>
        <View style={{ height: 40, justifyContent: 'center' }}>
          <FinalisedWhere data={ event.where } />
        </View>
        <View style={{ height: 30, justifyContent: 'center' }}>
          <FinalisedWhen data={ event.when } />
        </View>
        <View style={{ backgroundColor: colours.sectionBorder, height: 1, marginHorizontal: 5 }} />

        <View
          style={{
            flexDirection: 'row',
            borderRadius: 15,
            backgroundColor: colours.lightgray,
            paddingHorizontal: 5,
            paddingVertical: 5,
            marginTop: 10,
            marginBottom: 5,
            marginHorizontal: 5,
            justifyContent: 'space-between',
            alignItems: 'flex-start' }}
        >
          <View style={{ flex: 1, marginHorizontal: 5, backgroundColor: 'transparent' }}>
            <ButText color={colours.blue}>{ event.note }</ButText>
          </View>
          <View style={{ backgroundColor: colours.white, borderRadius: 15, padding: 1 }}>
            <Image
              source={{ uri: event.host_photo_url }}
              defaultSource={avatar}
              style={[styles.uiProfilePhotoCircularImage, { }]}
            />
          </View>

        </View>

        <View
          style={{
            marginTop: 5,
            paddingTop: 5,
            marginHorizontal: 5,
            borderTopColor: colours.sectionBorder,
            borderTopWidth: 1,
            alignItems: 'center' }}
        >

          { userIsHost &&
            <ConfirmButton
              onPress={ handleInviteMoreFriends }
            >
              <ConfirmButtonText>
                {'Invite friends  '}
                <Icon name="user-plus" size={20} color={colours.offWhite} />
              </ConfirmButtonText>
            </ConfirmButton>
          }

        </View>

        { !userIsHost &&
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{ marginLeft: 5, marginVertical: 5, fontSize: 14 }}>RSVPs</Text>

          <View style={{ flexDirection: 'row' }}>
            <Button
              buttonStyle={[styles.RSVPButton, inlineStyle.greenButton]}
              textStyle={styles.RSVPButtonText}
              onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_GOING) }
            >
              Going
            </Button>
            <Button
              buttonStyle={[styles.RSVPButton, inlineStyle.orangeButton]}
              textStyle={styles.RSVPButtonText}
              onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_MAYBE) }
            >
              Maybe
            </Button>
            <Button
              buttonStyle={[styles.RSVPButton, inlineStyle.redButton]}
              textStyle={styles.RSVPButtonText}
              onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_NOT_GOING) }
            >
              Not Going
            </Button>
          </View>

        </View>
        }
        <View style={{ marginBottom: 10, marginTop: 5, marginHorizontal: 5, borderTopColor: '#efefef', borderTopWidth: 1, alignItems: 'center' }} />
        <View style={{ flexDirection: 'row', backgroundColor: '#efefef', paddingVertical: 3, justifyContent: 'space-around' }}>
          <View style={[inlineStyle.RSVPTitle]}>
            <Text style={[{ color: colours.green }, inlineStyle.RSVPTitleText]}>
              <Icon name="check-circle" size={16} color={colours.green} />
              {' GOING'}
            </Text>
          </View>
          <View style={[inlineStyle.RSVPTitle]}>
            <Text style={[{ color: colours.orange }, inlineStyle.RSVPTitleText]}>
              <Icon name="question-circle" size={16} color={colours.orange} />
              {' MAYBE'}
            </Text>
          </View>
          <View style={[inlineStyle.RSVPTitle]}>
            <Text style={[{ color: colours.red }, inlineStyle.RSVPTitleText]}>
              <Icon name="times-circle" size={16} color={colours.red} />
              {' NOT GOING'}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={ inlineStyle.column }>
            <View>

              {
                rsvps.going && rsvps.going.map((invitee) => {
                  return (
                    <InviteeCard key={invitee.user_id} firstname={invitee.firstname} photo_url={invitee.photo_url} />
                  );
                })
              }

            </View>
          </View>
          <View style={ inlineStyle.column }>
            <View>

              {
                rsvps.maybe && rsvps.maybe.map((invitee) => {
                  return (
                    <InviteeCard key={invitee.user_id} firstname={invitee.firstname} photo_url={invitee.photo_url} />
                  );
                })
              }

            </View>
          </View>
          <View style={ inlineStyle.column }>
            <View>

              {
                rsvps.not_going && rsvps.not_going.map((invitee) => {
                  return (
                    <InviteeCard key={invitee.user_id} firstname={invitee.firstname} photo_url={invitee.photo_url} />
                  );
                })
              }

            </View>
          </View>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, borderTopWidth: 1, borderTopColor: '#efefef' }}>
          <Text style={[styles.msg4, { marginLeft: 10, marginTop: 5 }]}>Not responded</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            rsvps.not_responded.map((invitee) => {
              if (invitee.user_id === event.host_user_id) {
                return null;
              }
              return (
                <InviteeCard
                  key={ invitee.firstname + Date.now() }
                  firstname={ invitee.firstname }
                  photo_url={ invitee.photo_url }
                />
              );
            })
          }
        </View>


      </ScrollView>
    </View>
  );
};

export default FinalisedEvent;
