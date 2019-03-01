/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colours from '../../../styles/colours';
import { iconScale, moderateScale } from '../../../styles/scaling';

export default class OfflineIcon extends Component {


  render () {
    console.log('render offlineIcon:');
    // console.log('offlineIcon:', this.props);
    const { isConnected } = this.props;
    console.log('isConnected:', isConnected);
    if (!isConnected) {
      return (

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: iconScale(15)
          }}
        >
          <Icon
            name="cloud-off" // Feather
            style={{ }}
            size={ moderateScale(24) }
            color={ colours.headerButtonColor }
          />
          <Text style={{ color: colours.headerButtonColor, fontSize: 10 }}>offline</Text>
        </View>

      );
    }
    return null;

  }
}

// name="signal" // entypo
// style={{ textDecorationColor: colours.headerButtonColor, textDecorationLine: 'line-through', paddingLeft: 5, paddingRight: 5 }}
