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
          backgroundColor: colours.verylightgray,
          borderBottomRightRadius: 3,
          borderTopRightRadius: 3,
          borderBottomLeftRadius: 3,
          borderTopLeftRadius: 3
        }}
      >
        <Text
          style={[
            styles.title6, {
              color: colours.red
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
          backgroundColor: colours.verylightgray,
          borderBottomRightRadius: 3,
          borderTopRightRadius: 3,
          borderBottomLeftRadius: 3,
          borderTopLeftRadius: 3

        }}
      >
        <Text
          style={[
            styles.title6, {

              fontSize: 12,
              color: colours.main
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
          backgroundColor: colours.verylightgray,
          borderBottomRightRadius: 3,
          borderTopRightRadius: 3,
          borderBottomLeftRadius: 3,
          borderTopLeftRadius: 3
        }}
      >
        <Text
          style={[
            styles.title6, {
              fontSize: 12,
              color: colours.green
            }]}
        >Confirmed</Text>
      </View>
    );

  }

};

export default StatusFlag;
