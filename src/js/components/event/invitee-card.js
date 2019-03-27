import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import colours from '../../../styles/colours';
import { ButText } from '../../../styles/text';
import { moderateScale } from '../../../styles/scaling';

const windowWidth = Dimensions.get('window').width;
console.log('windowWidth:', windowWidth);

const cardStyle = {
  height: (windowWidth > 600) ? moderateScale(40) : moderateScale(30),
  paddingVertical: 5,
  paddingRight: 5,
  borderRadius: 3,
  marginHorizontal: 2,
  marginVertical: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  maxWidth: windowWidth * 0.33
};
const imageStyle = {
  width: (windowWidth > 600) ? moderateScale(40) : moderateScale(30), // 30 for iphone5s
  height: (windowWidth > 600) ? moderateScale(40) : moderateScale(30), // 40 for iPAD
  borderRadius: 3,
  marginRight: 4
};
const textStyle = {

  flex: 2,
  color: colours.main
};

export default function InviteeCard ({ firstname, photo_url }) {
  return (
    <View style={cardStyle}>
      <Image source={{ uri: photo_url }} style={imageStyle} />
      <ButText numberOfLines={1} style={textStyle}>{firstname}</ButText>
    </View>
  );
}

InviteeCard.propTypes = {
  firstname: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired
};
