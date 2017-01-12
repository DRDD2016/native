import React from 'react';
import { View, Text, Image } from 'react-native';
import Button from '../../common/Button';
import styles from '../../../../styles';

const rsvpsArea = ({ event_id, invitees, rsvps, respondedList, notRespondedList, handleClick }) => {

  function RSVPUserList (rsvps, invitees, status) { // eslint-disable-line

    return rsvps[status].map((id, index) => {
      const usersWithRSVP = invitees.filter(userObject => id === userObject.id);

      return (
        <View style={styles.item} key={ index }>
          <Image style={styles.uiAvatarImage} source={{ uri: usersWithRSVP[0].photo_url }} />
          <View style={styles.content}>
            <View style={styles.headerRsvpListItems}>{ usersWithRSVP[0].firstname }</View>
          </View>
        </View>
      );
    });
  }

  return (
    <View>
      <Text>rsvps</Text>

      <View style={styles.row}>
        <View>
          <Button buttonStyle={styles.RSVPButtonGoing} onPress={ () => handleClick('going', event_id) }> Going </Button>
          <View style={styles.uiBigHorizontalList}>
            { RSVPUserList(rsvps, invitees, 'going') }
          </View>
        </View>

        <View>
          <Button buttonStyle={styles.RSVPButtonMaybe} onPress={ () => handleClick('maybe', event_id) }> Maybe </Button>
          <View style={styles.uiBigHorizontalList}>
            { RSVPUserList(rsvps, invitees, 'maybe') }
          </View>
        </View>

        <View>
          <Button buttonStyle={styles.RSVPButtonNotGoing} onPress={ () => handleClick('notGoing', event_id) }> Not Going </Button>
          <View style={styles.uiBigHorizontalList}>
            { RSVPUserList(rsvps, invitees, 'notGoing') }
          </View>
        </View>
      </View>


      <View style={styles.row}>
        <View style={styles.RSVPButtonNotResponded}>
          <View> Not Responded </View>
        </View>
        <View>
          <View style={styles.uiBigHorizontalList}>
            { notRespondedList(respondedList, invitees) }
          </View>
        </View>
      </View>


      <View style={styles.row}>
        <View />
      </View>

    </View>
  );
};

export default rsvpsArea;
