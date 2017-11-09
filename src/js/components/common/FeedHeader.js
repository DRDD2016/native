import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-navigation';
import HeaderBack from '../common/FeedHeaderBackground';
import colours from '../../../styles/colours';


export default function FeedHeader ({ children }) {
  return (

    <View
      style={{
        justifyContent: 'flex-start',
        backgroundColor: colours.white }}
    >

      <View style={{ height: Header.HEIGHT, flexDirection: 'row', alignItems: 'flex-start' }}>
        <HeaderBack>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              borderBottomWidth: 1,
              borderBottomColor: colours.lightgray,
              borderTopWidth: 1,
              borderTopColor: colours.gray }}
          >

            {children}

          </View>

        </HeaderBack>
      </View>
    </View>

  );
}
