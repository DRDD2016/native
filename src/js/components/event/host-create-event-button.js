import React from 'react';
import { View } from 'react-native';
import Button from '../common/Button';
import styles from '../../../styles';

const HostCreateEventButton = ({ hostEventChoices, handleConfirmEvent, eventID }) => { //eslint-disable-line
  const hostHasSelectedEventOptions =
  Object.keys(hostEventChoices).every(categoryName => hostEventChoices[categoryName] !== '');

  const hideButton = !hostHasSelectedEventOptions;

  return (
    <View>
      { (hideButton) &&
        <View />
      }
      { (!hideButton) &&
        <Button
          buttonStyle={styles.confirmButton}
          textStyle={styles.confirmButtonText}
          onClick={ () => { handleConfirmEvent(hostEventChoices, eventID); }}
        > CONFIRM & SEND INVITES </Button>
      }
    </View>
  );

};

export default HostCreateEventButton;
