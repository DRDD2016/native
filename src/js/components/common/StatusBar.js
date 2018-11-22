import React from 'react';
import { View, StatusBar } from 'react-native';
// import colours from '../../../styles/colours';
// console.log('Platform.OS:', Platform.OS);


// export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export const STATUSBAR_HEIGHT = 20;

// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = {
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
};

export default function MyStatusBar ({ backgroundColor, ...props }) {

  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );

}
