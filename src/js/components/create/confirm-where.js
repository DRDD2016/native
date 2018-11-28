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
        style={{ flexDirection: 'column', alignItems: 'flex-start', marginVertical: 1 }}
        key={ i }
      >
        { (hideTitle) &&
          <View style={{ flex: 150, marginHorizontal: 4 }} />
        }
        { (!hideTitle) &&
          <View style={{ flex: 150, marginHorizontal: 4 }}>
            <Text style={{ color: colours.main }}>
              Where
            </Text>
          </View>
        }
        <View
          style={{ flex: 800, paddingHorizontal: 10 }}
        >
          <View style={{ }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginLeft: 4, width: 24, justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
                <Icon name="map-marker" size={22} color={colours.where} />
              </View>
              <ButText style={{ textAlign: 'left' }} color={colours.where}>
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
