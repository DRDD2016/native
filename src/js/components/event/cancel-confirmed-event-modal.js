import React from 'react';
import { View, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import styles from '../../../styles';

const CancelConfirmedEventModal = ({ handleDeleteEvent, handleCloseModal }) => { //eslint-disable-line

  return (
    <View style={styles.basicModal}>
      <View>
        <View>
          <Text>c</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text>Delete this event?</Text>
      </View>
      <View>
        <View>
          <Button onClick={ handleCloseModal }>
            <Text>c</Text>
            <Text>
              No
            </Text>
          </Button>
          <Button onClick={ handleDeleteEvent }>
            <Text>c</Text>
            <Text>
              Yes
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CancelConfirmedEventModal;
