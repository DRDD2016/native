import React, { PropTypes } from 'react';
import { Text, View, Image } from 'react-native';

const cardStyle = {
  height: 30,
  paddingVertical: 5,
  paddingRight: 5,
  borderRadius: 3,
  marginHorizontal: 2,
  marginVertical: 1,
  backgroundColor: '#efefef',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  maxWidth: 120
};
const imageStyle = {
  width: 30,
  height: 30,
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
      <Text style={textStyle}>{firstname}</Text>
    </View>
  );
}

InviteeCard.propTypes = {
  firstname: PropTypes.string.isRequired,
  photo_url: PropTypes.string.isRequired
};
