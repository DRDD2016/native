import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const StatusFlag = ({ isCancelled, is_poll }) => {

  if (isCancelled) {
    return (
      <View
        style={{
          padding: 2,
          backgroundColor: colours.red,
          borderBottomRightRadius: 5,
          borderTopRightRadius: 5
        }}
      >
        <Text
          style={[
            styles.title6, {
              color: colours.white
            }]}
        >Cancelled</Text>
      </View>
    );
  }

  if (!isCancelled && is_poll) {

    return (
      <View
        style={{
          padding: 2,
          backgroundColor: colours.purple,
          borderBottomRightRadius: 5,
          borderTopRightRadius: 5
        }}
      >
        <Text
          style={[
            styles.title6, {
              color: colours.white
            }]}
        >Polling</Text>
      </View>
    );
  }

  if (!isCancelled && !is_poll) {

    return (
      <View
        style={{
          padding: 2,
          backgroundColor: colours.blue,
          borderBottomRightRadius: 5,
          borderTopRightRadius: 5
        }}
      >
        <Text
          style={[
            styles.title6, {
              color: colours.white
            }]}
        >Confirmed</Text>
      </View>
    );

  }

};

export default StatusFlag;
