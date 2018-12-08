/* eslint-disable */
import React from 'react';
import { View, Text } from 'react-native';
import Icon2 from 'react-native-vector-icons/Entypo';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import { Title3, Button, ButText } from '../../../styles';

const ConfirmWhere = ({ data }) => { // eslint-disable-line react/prop-types

  const layout = data.map((datum, i) => {

    const hideTitle = i > 0;

    return (
      <View key={ i } style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 1 }} >
        <View style={{ marginLeft: 4, width: 24, justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
          <Icon2 name="location" size={22} color={colours.where} />
        </View>
        <ButText style={{ textAlign: 'left' }} color={colours.where}>
          { datum || 'TBC' }
        </ButText>
      </View>

    );
  });

  console.log('confirmWhere finished');

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

      <View style={{ flexDirection: 'column' }} >

        { layout }

      </View>

    </View>
  );
};

export default ConfirmWhere;
