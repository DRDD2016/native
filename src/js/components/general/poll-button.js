import React from 'react';
import { View } from 'react-native';
import Button from '../common/Button';
import styles from '../../../styles';

const PollButton = ({ poll, handleVote, event_id, voteButtonText }) => {

  const userHasCompletedPoll = Object.keys(poll).map((categoryName) => {

    return poll[categoryName].some((value) => {

      return value === true;
    });
  }).every((category) => {

    return category === true;
  });

  function handleSelection (poll, event_id) { // eslint-disable-line no-shadow
    handleVote(poll, event_id);
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
          onClick={ () => handleSelection(poll, event_id) }
        >
          { voteButtonText }
        </Button>
      }
    </View>
  );
};

export default PollButton;
