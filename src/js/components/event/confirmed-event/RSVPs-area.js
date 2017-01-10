import React from 'react';
import { View, Text, Image } from 'react-native';
import Button from '../../common/Button';
import styles from '../../../../styles';

const RSVPsArea = ({ eventID, invitees, RSVPs, respondedList, notRespondedList, handleClick }) => {

  function RSVPUserList (RSVPs, invitees, status) { // eslint-disable-line

    return RSVPs[status].map((id, index) => {
      const usersWithRSVP = invitees.filter(userObject => id === userObject.id);

      return (
        <View style={styles.item} key={ index }>
          <Image style={styles.uiAvatarImage} source={{ uri: usersWithRSVP[0].photoURL }} />
          <View style={styles.content}>
            <View style={styles.headerRsvpListItems}>{ usersWithRSVP[0].firstName }</View>
          </View>
        </View>
      );
    });
  }

  return (
    <View>
      <Text>RSVPs</Text>

      <View style={styles.row}>
        <View>
          <Button buttonStyle={styles.RSVPButtonGoing} onPress={ () => handleClick('going', eventID) }> Going </Button>
          <View style={styles.uiBigHorizontalList}>
            { RSVPUserList(RSVPs, invitees, 'going') }
          </View>
        </View>

        <View>
          <Button buttonStyle={styles.RSVPButtonMaybe} onPress={ () => handleClick('maybe', eventID) }> Maybe </Button>
          <View style={styles.uiBigHorizontalList}>
            { RSVPUserList(RSVPs, invitees, 'maybe') }
          </View>
        </View>

        <View>
          <Button buttonStyle={styles.RSVPButtonNotGoing} onPress={ () => handleClick('notGoing', eventID) }> Not Going </Button>
          <View style={styles.uiBigHorizontalList}>
            { RSVPUserList(RSVPs, invitees, 'notGoing') }
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

export default RSVPsArea;
