/* eslint-disable */
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import { Title3, Button, ButText } from '../../../styles';

const ConfirmWhere = ({ data }) => { // eslint-disable-line react/prop-types

  const layout = data.map((datum, i) => {

    const hideTitle = i > 0;

    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 1 }}
        key={ i }
      >
        { (hideTitle) &&
          <View style={{ flex: 50, marginHorizontal: 5 }} />
        }
        { (!hideTitle) &&
          <View style={{ flex: 50, marginHorizontal: 5 }}>
            <Title3 color={colours.where}>
              Where
            </Title3>
          </View>
        }
        <View
          style={{ flex: 250 }}
        >
          <View style={{ }}>
            <View>
              <ButText color={colours.where}>
                <Icon name="map-marker" size={18} color={colours.where} />
                {'  '}
                { datum || 'TBC' }
              </ButText>
            </View>
          </View>
        </View>
      </View>
    );
  });

  console.log('confirmWhere finished');

  return (
    <View style={{ marginTop: 3, marginRight: 10 }}>
      { layout }
    </View>
  );
};

export default ConfirmWhere;
