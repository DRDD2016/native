import React from 'react';
import { View } from 'react-native';
import Button from '../common/Button';
import styles from '../../../styles';

const HostCreateEventButton = ({ finalChoices, handleConfirmEvent, event_id }) => { //eslint-disable-line
  const hostHasSelectedEventOptions =
  Object.keys(finalChoices).every(categoryName => finalChoices[categoryName] !== '');

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
          onClick={ () => { handleConfirmEvent(finalChoices, event_id); }}
        >
          CONFIRM & SEND INVITES
        </Button>
      }
    </View>
  );

};

export default HostCreateEventButton;
