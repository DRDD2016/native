import PropTypes from 'prop-types';
import React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const cardStyle = {
  height: 30,
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
  width: 30,
  height: 30,
  borderRadius: 15,
  marginRight: 5
};
const textStyle = {
  fontSize: 12,
  flex: 2
};

export default function InviteeCard ({ firstname, photo_url }) {
  return (
    <View style={cardStyle}>
      <Image source={{ uri: photo_url }} style={imageStyle} />
      <Text numberOfLines={1} style={textStyle}>{firstname}</Text>
    </View>
  );
}

InviteeCard.propTypes = {
  firstname: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired
};
