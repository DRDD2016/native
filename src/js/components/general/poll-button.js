import React from 'react';
import { View } from 'react-native';
import Button from '../common/Button';
import styles from '../../../styles';

const PollButton = ({ poll, handlePollConfirmation, eventID, voteButtonText }) => {

  const userHasCompletedPoll = Object.keys(poll).map((categoryName) => {

    return poll[categoryName].some((value) => {

      return value === true;
    });
  }).every((category) => {

    return category === true;
  });

  function handleSelection (poll, eventID) { // eslint-disable-line no-shadow
    handlePollConfirmation(poll, eventID);
    console.log('go to feed');
  }

  return (
    <View>
      { (!userHasCompletedPoll) &&
        <View />
      }
      { (userHasCompletedPoll) &&
        <Button
          buttonStyle={styles.buttonStyle}
          onClick={ () => handleSelection(poll, eventID) }
        >
          { voteButtonText }
        </Button>
      }
    </View>
  );
};

export default PollButton;
