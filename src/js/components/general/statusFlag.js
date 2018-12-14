import React from 'react';
import { View } from 'react-native';
import colours from '../../../styles/colours';
import { StatusFlagText } from '../../../styles/text';
import { feedVertPaddingScale } from '../../../styles/scaling';

const StatusFlag = ({ isCancelled, is_poll }) => {

  if (isCancelled) {
    return (
      <View
        style={{ width: '100%', paddingHorizontal: 2, alignItems: 'center', backgroundColor: colours.verylightgray, opacity: 0.8, borderRadius: 3, marginBottom: 2 }} // eslint-disable-line max-len
        >
        <View
          style={{
            width: '100%',
            paddingVertical: 1,
            backgroundColor: colours.white,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: colours.lightgray,
            borderBottomWidth: 1,
            marginTop: feedVertPaddingScale(2)
          }}
        >
          <StatusFlagText
            color={colours.red}
          >Cancelled</StatusFlagText>
        </View>
      </View>
    );
  }

  if (!isCancelled && is_poll) {

    return (
      <View
        style={{ width: '100%', paddingHorizontal: 2, alignItems: 'center', backgroundColor: colours.verylightgray, opacity: 0.8, borderRadius: 3, marginBottom: 4 }} // eslint-disable-line max-len
      >
        <View
          style={{
            width: '100%',
            paddingVertical: 1,
            backgroundColor: colours.white,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: colours.lightgray,
            borderBottomWidth: 1,
            marginTop: feedVertPaddingScale(2)

          }}
        >
          <StatusFlagText
            color={colours.orange}
          >Polling</StatusFlagText>
        </View>
      </View>
    );
  }

  if (!isCancelled && !is_poll) {

    return (
      <View
        style={{ width: '100%', paddingHorizontal: 2, alignItems: 'center', backgroundColor: colours.verylightgray, opacity: 0.8, borderRadius: 3, marginBottom: 4 }} // eslint-disable-line max-len
      >
        <View
          style={{
            width: '100%',
            paddingVertical: 1,
            backgroundColor: colours.white,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: colours.lightgray,
            borderBottomWidth: 1,
            marginTop: feedVertPaddingScale(2)
            // elevation: 1,
            // shadowColor: colours.shadowColour,
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.8,
            // shadowRadius: 2
          }}
        >
          <StatusFlagText
            color={colours.green}
          >Confirmed</StatusFlagText>
        </View>
      </View>
    );

  }

};

export default StatusFlag;
