/* eslint-disable */
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import { Title3, Button, ButText } from '../../../styles';


const ConfirmWhat = ({ data }) => {

  const layout = data.map((datum, i) => {

    console.log(`ConfirmWhat: ${i}`);

    const hideTitle = i > 0;

    return (

      <View key={ i } style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 1 }} >
        <View style={{ marginLeft: 4, width: 24, justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
          <Icon name="star" size={22} color={colours.what} />
        </View>
        <ButText color={colours.what}>
          { datum || 'TBC' }
        </ButText>
      </View>

    );
  });

  console.log('confirmWhat finished');

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

      <View style={{ flexDirection: 'column' }} >

        { layout }

      </View>
    </View>
  );
};

export default ConfirmWhat;
