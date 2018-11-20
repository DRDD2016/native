import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
// import colours from '../../../styles/colours';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
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
