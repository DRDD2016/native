/* eslint-disable arrow-body-style */
import React from 'react';
import { View, Image, Text, ScrollView, TouchableHighlight, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import FinalisedWhat from '../create/confirm-what';
import FinalisedWhere from '../create/confirm-where';
import FinalisedWhen from '../create/confirm-when';
import EditIcon from '../common/edit-icon';
import MessageBubble from '../common/messageBubble';
import InviteeCard from './invitee-card';
import { styles, Msg1, ButText, ConfirmButton, ConfirmButtonText, RSVPButton, RSVPButtonText } from '../../../styles';
import colours from '../../../styles/colours';

const NAVBAR_HEIGHT = Header.HEIGHT;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 5, android: StatusBar.currentHeight });
const TITLE_PANEL_HEIGHT = Platform.select({ ios: (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) + 10, android: NAVBAR_HEIGHT });

const STATUS_GOING = 'going';
const STATUS_MAYBE = 'maybe';
const STATUS_NOT_GOING = 'not_going';

const inlineStyle = {
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
    fontWeight: '600',
    textAlign: 'center'
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

const FinalisedEvent = ({ event, userIsHost, isPoll, rsvpToEvent, rsvps, userID, handleEdit, handleInviteMoreFriends }) => {
  console.log('wooo event:', event);
  console.log('wooo rsvpToEvent:', rsvpToEvent);
  console.log('wooo rsvps:', rsvps);
  console.log('userID', userID);


  const goingIsSelected = rsvps.going.some((invitee) => {
    return invitee.user_id === userID;
  });
  const maybeIsSelected = rsvps.maybe.some((invitee) => {
    return invitee.user_id === userID;
  });
  const not_goingIsSelected = rsvps.not_going.some((invitee) => {
    return invitee.user_id === userID;
  });
  const not_respondedIsSelected = rsvps.not_responded.some((invitee) => {
    return invitee.user_id === userID;
  });

  const rsvpStatus = ({ going: goingIsSelected, maybe: maybeIsSelected, not_going: not_goingIsSelected, not_responded: not_respondedIsSelected });
  console.log('rsvpStatus', rsvpStatus);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 4, borderColor: 'red', borderWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} // eslint-disable-line max-len
      >
        <View style={{ height: TITLE_PANEL_HEIGHT, width: TITLE_PANEL_HEIGHT, padding: 0, paddingTop: 0, borderColor: 'blue', borderWidth: 0 }}>
          <ButText style={{ textAlign: 'center' }}>
            Hosted by
          </ButText>
          <View style={{ flex: 1, padding: 0, borderColor: 'red', borderWidth: 0 }}>
            <Image
              source={{ uri: event.host_photo_url }}
              style={[styles.uiProfilePhotoMessage, { height: '100%',
                aspectRatio: 1 / 1,
                // height: 40,
                alignSelf: 'center',
                borderRadius: 3
              // style={{ borderRadius: 15,
              // marginLeft: 4,
              // width: Header.HEIGHT,
              // height: Header.HEIGHT,
              // resizeMode: 'contain'
              }]}
            />
          </View>
          <ButText style={{ textAlign: 'center' }}>
            Dave
          </ButText>
        </View>

        { userIsHost ?
          <View style={{ flex: 1 }}>
            <Msg1 style={{ alignSelf: 'center' }}>{event.name}</Msg1>
          </View>
          :
          <View style={{ borderColor: 'red', borderWidth: 0 }}>

            <Msg1 style={{ borderColor: 'yellow', borderWidth: 0, paddingVertical: 4, textAlign: 'center' }}>{event.name}</Msg1>

          </View>
        }

        { userIsHost ?
          null
          :
          <View style={{ borderColor: 'red', borderWidth: 0, width: TITLE_PANEL_HEIGHT, height: TITLE_PANEL_HEIGHT }} />
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
          <View style={{ flex: 1, alignSelf: 'center' }}>
            <View>
              <ButText style={{
                textAlign: 'center',
                color: event.description ? colours.gray : colours.lightgray,
                paddingVertical: 4,
                paddingHorizontal: 10 }}
              >
                {event.description}
              </ButText>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: colours.sectionBorder, height: 1, marginHorizontal: 4 }} />
        <View style={{ padding: 4, justifyContent: 'center' }}>
          <FinalisedWhat data={ event.what } />
        </View>
        <View style={{ padding: 4, justifyContent: 'center' }}>
          <FinalisedWhere data={ event.where } />
        </View>
        <View style={{ padding: 4, justifyContent: 'center' }}>
          <FinalisedWhen data={ event.when } />
        </View>

        <View style={{ backgroundColor: colours.sectionBorder, height: 1, marginHorizontal: 4 }} />

        {
          (event.note.trim() !== '') &&

          <MessageBubble messageText={event.note} messageDate="13 Dec" messageDirection="left" photo_url={event.host_photo_url} sender="firstname" />

        }


        <View
          style={{
            marginTop: 4,
            paddingTop: 4,
            marginHorizontal: 4,
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
          <Text style={{ marginLeft: 4, marginBottom: 4, color: colours.main }}>Your status</Text>


          <View style={{ flexDirection: 'row' }}>
            <RSVPButton
              style={inlineStyle.greenButton}
              onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_GOING) }
            >
              <View style={{ flexDirection: 'row' }}>
                <RSVPButtonText>
                  Going
                </RSVPButtonText>
                {
                  rsvpStatus.going && <Icon name="check" size={20} style={{ paddingLeft: 5 }} color={colours.white} />
                }
              </View>
            </RSVPButton>
            <RSVPButton
              style={inlineStyle.orangeButton}
              onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_MAYBE) }
            >
              <View style={{ flexDirection: 'row' }}>
                <RSVPButtonText>
                  Maybe
                </RSVPButtonText>
                {
                  rsvpStatus.maybe && <Icon name="check" size={20} style={{ paddingLeft: 5 }} color={colours.white} />
                }
              </View>
            </RSVPButton>
            <RSVPButton
              style={inlineStyle.redButton}
              onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_NOT_GOING) }
            >
              <View style={{ flexDirection: 'row' }}>
                <RSVPButtonText>
                  Not Going
                </RSVPButtonText>
                {
                  rsvpStatus.not_going && <Icon name="check" size={20} style={{ paddingLeft: 5 }} color={colours.white} />
                }
              </View>
            </RSVPButton>
          </View>

        </View>
        }
        <View style={{ marginTop: 8, marginHorizontal: 4, borderTopColor: '#efefef', borderTopWidth: 1, alignItems: 'center' }} />
        {(rsvps.not_responded.length > 1) && <Text style={{ color: colours.main, paddingLeft: 4, paddingVertical: 4 }}>Invitees</Text>}
        <View style={{ flexDirection: 'row', backgroundColor: '#efefef', paddingVertical: 3, justifyContent: 'space-around' }}>
          <View style={[inlineStyle.RSVPTitle]}>
            <Text style={[{ color: colours.green }, inlineStyle.RSVPTitleText]}>
              <Icon name="check-circle" size={16} color={colours.green} />
              {` GOING (${rsvps.going.length})`}
            </Text>
          </View>
          <View style={[inlineStyle.RSVPTitle]}>
            <Text style={[{ color: colours.orange }, inlineStyle.RSVPTitleText]}>
              <Icon name="question-circle" size={16} color={colours.orange} />
              {` MAYBE (${rsvps.maybe.length})`}
            </Text>
          </View>
          <View style={[inlineStyle.RSVPTitle]}>
            <Text style={[{ color: colours.red }, inlineStyle.RSVPTitleText]}>
              <Icon name="times-circle" size={16} color={colours.red} />
              {` NOT GOING (${rsvps.not_going.length})`}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 2 }}>

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
          <View style={{ height: '100%', width: 1, backgroundColor: colours.sectionBorder }} />
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
          <View style={{ height: '100%', width: 1, backgroundColor: colours.sectionBorder }} />
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
        <View style={{ marginTop: 10, marginBottom: 10, borderTopWidth: 1, borderTopColor: colours.sectionBorder }}>
          {(rsvps.not_responded.length > 0) && <Text style={{ color: colours.main, paddingLeft: 4, paddingTop: 4 }}>Yet to respond:</Text>}
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
