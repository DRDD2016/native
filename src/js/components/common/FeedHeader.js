import React from 'react';
import { View } from 'react-native';
import HeaderBack from '../common/FeedHeaderBackground';
import colours from '../../../styles/colours';
import { scale } from '../../../styles/scaling';


export default function FeedHeader ({ children }) {
  return (

    <View
      style={{
        justifyContent: 'flex-start',
        backgroundColor: colours.white }}
    >

      <View style={{ height: scale(50), flexDirection: 'row', alignItems: 'flex-start' }}>
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
