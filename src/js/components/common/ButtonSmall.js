import React from 'react';
import { TouchableOpacity, View } from 'react-native';

// import colours from '../../../styles/colours';

export default function ButtonSmall ({ headerHeight, onPress, children, testDescription, backgroundColor }) {

  return (

    <View style={{ width: headerHeight, flexDirection: 'row', justifyContent: 'center' }}>

      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          width: headerHeight / 1.5,
          height: headerHeight / 1.5,
          borderRadius: 5,
          elevation: 1, // replaces shadow on Android, shadow props IOS only
          shadowOpacity: 0.75,
          shadowRadius: 5,
          shadowColor: 'darkgray',
          shadowOffset: { height: 2, width: 0 }
        }}
        accessibilityLabel={testDescription}
      >

        {children}

      </TouchableOpacity>

    </View>
  );
}
