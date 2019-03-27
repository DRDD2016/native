/* eslint-disable arrow-body-style */
import React from 'react';
import { View, Image, ScrollView, TouchableHighlight, Platform, StatusBar, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeleteIcon from '../common/delete-icon';
import FinalisedWhat from '../create/confirm-what';
import FinalisedWhere from '../create/confirm-where';
import FinalisedWhen from '../create/confirm-when';
import EditIcon from '../common/edit-icon';
import MessageBubble from '../common/messageBubble';
import InviteeCard from './invitee-card';
import { styles, PaddingMain, ConfirmButton, RSVPButton } from '../../../styles';
import colours from '../../../styles/colours';
import { ForgotPasswordText, RSVPButtonText, Msg1, ButText, ConfirmButtonText } from '../../../styles/text';
import { moderateScale } from '../../../styles/scaling';

const windowWidth = Dimensions.get('window').width;

const NAVBAR_HEIGHT = Header.HEIGHT;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 5, android: StatusBar.currentHeight });
const TITLE_PANEL_HEIGHT = Platform.select({ ios: (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) + 10, android: NAVBAR_HEIGHT });
// console.log('NAVBAR_HEIGHT: ', NAVBAR_HEIGHT);
// console.log('STATUS_BAR_HEIGHT: ', STATUS_BAR_HEIGHT);
const STATUS_GOING = 'going';
const STATUS_MAYBE = 'maybe';
const STATUS_NOT_GOING = 'not_going';

const inlineStyle = {
  RSVPTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginHorizontal: 5
  },
  RSVPButtonText: {
    fontSize: 16,
    color: colours.white
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
    padding: 4,
    paddingTop: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
};

const FinalisedEvent = ({ event, userIsHost, isPoll, rsvpToEvent, rsvps, userID, handleEdit, handleInviteMoreFriends, handleDeleteEvent }) => {
  console.log('wooo event:', event);
  console.log('wooo rsvpToEvent:', rsvpToEvent);
  console.log('wooo rsvps:', rsvps);
  console.log('userID', userID);
  console.log('rsvps not length:', rsvps.not_responded.length);
  console.log('rsvps not:', rsvps.not_responded);
  console.log('host_user_id:', event.host_user_id);

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

  // move icons and Host onto Header bar

  return (
    <ScrollView style={{ height: '100%', borderColor: 'orange', borderWidth: 0 }}>
      <View style={{ backgroundColor: colours.verylightgray, paddingVertical: 4, borderBottomColor: colours.sectionBorder, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} // eslint-disable-line max-len
      >
        <View style={{
          justifyContent: 'flex-start',
          padding: PaddingMain,
          paddingTop: 0,
          borderColor: 'blue',
          borderWidth: 0 }}>
          <ButText style={{ textAlign: 'center' }}>
            Hosted by
          </ButText>
          <View style={{ borderColor: 'red', borderWidth: 0 }}>
            <Image
              source={{ uri: event.host_photo_url }}
              style={[styles.uiProfilePhotoMessage, {
                padding: PaddingMain,
                aspectRatio: 1 / 1,
                height: (windowWidth > 600) ? moderateScale(40) : moderateScale(30), // 40 on iPAD
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
            {event.firstname}
          </ButText>
        </View>

        { userIsHost ?
          <View style={{ flex: 1 }}>
            <Msg1 style={{ alignSelf: 'center', textAlign: 'center' }}>{event.name}</Msg1>
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

      <View>

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
            borderTopWidth: 0,
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
          <ButText style={{ marginLeft: 4, marginBottom: 4, color: colours.main }}>Your status</ButText>


          <View style={{ flexDirection: 'row' }}>
            <RSVPButton
              style={inlineStyle.greenButton}
              onPress={ () => !userIsHost && rsvpToEvent(event.event_id, STATUS_GOING) }
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        {(rsvps.not_responded.length > 0) && <ButText style={{ color: colours.main, paddingLeft: 4, paddingVertical: 4 }}>Invitees</ButText>}
        <View style={{ flexDirection: 'row', backgroundColor: colours.offWhite, paddingVertical: 3, justifyContent: 'space-around' }}>
          <View style={[inlineStyle.RSVPTitle]}>
            <Icon name="check-circle" size={16} color={colours.green} />
            <ButText style={{ color: colours.green, textAlign: 'center' }}>
              {` GOING (${rsvps.going.length})`}
            </ButText>
          </View>
          <View style={[inlineStyle.RSVPTitle]}>
            <Icon name="question-circle" size={16} color={colours.orange} />
            <ButText style={{ color: colours.orange, textAlign: 'center' }}>
              {` MAYBE (${rsvps.maybe.length})`}
            </ButText>
          </View>
          <View style={[inlineStyle.RSVPTitle]}>
            <Icon name="times-circle" size={16} color={colours.red} />
            <ButText style={{ color: colours.red, textAlign: 'center' }}>
              {` NOT GOING (${rsvps.not_going.length})`}
            </ButText>
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
          {(rsvps.not_responded.length > 0) && <ButText style={{ color: colours.main, paddingLeft: 4, paddingTop: 4 }}>Yet to respond:</ButText>}
        </View>
        <View style={{ paddingLeft: 4, flexDirection: 'row', flexWrap: 'wrap' }}>
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

        <ConfirmButton
          style={{
            width: undefined,
            borderColor: colours.offWhite,
            backgroundColor: colours.offWhite,
            marginVertical: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignSelf: 'center' }}
          onPress={ () => handleDeleteEvent(event, event.event_id) }
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <DeleteIcon color={colours.main} />
            <ForgotPasswordText>
            Delete this event
            </ForgotPasswordText>
          </View>
        </ConfirmButton>


      </View>
    </ScrollView>
  );
};

export default FinalisedEvent;
