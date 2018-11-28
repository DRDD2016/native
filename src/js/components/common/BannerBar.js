/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colours from '../../../styles/colours';


const gradientStyles = {
  linearGradient: {
    marginTop: 0, // 15,
    borderRadius: 0,
    width: '100%',
    height: 3
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  }
};

export default class BannerBar extends Component {


  render () {

    const { style } = this.props;

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[colours.purple, colours.orange, colours.green]}
        style={{ ...gradientStyles.linearGradient, ...style }} />
    );
  }
}
