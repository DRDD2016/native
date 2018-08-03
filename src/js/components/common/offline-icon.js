/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colours from '../../../styles/colours';

export default class OfflineIcon extends Component {


  render () {
    console.log('offlineIcon:', this.props);
    const { isConnected } = this.props;
    console.log('isConnected:', isConnected);
    if (!isConnected) {
      return (

        <View
          style={{ flexDirection: 'column', alignItems: 'center' }}
        >
          <Icon
            name="cloud-off" // Feather
            style={{ paddingLeft: 5, paddingRight: 5 }}
            size={ 20 }
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
