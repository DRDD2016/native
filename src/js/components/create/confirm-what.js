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
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 1 }}
        key={ i }
      >
        { (hideTitle) &&
          <View style={{ flex: 150, marginHorizontal: 4 }} />
        }
        { (!hideTitle) &&
          <View style={{ flex: 150, marginHorizontal: 4 }}>
            <Text style={{ color: colours.what }}>
              What
            </Text>
          </View>
        }
        <View
          style={{ flex: 800 }}
          key={ i }
        >
          <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginLeft: 4, width: 20, alignItems: 'center' }}>
                <Icon name="star" size={22} color={colours.what} />
              </View>
              <ButText color={colours.what}>

                {'  '}
                { datum || 'TBC' }
              </ButText>
            </View>
          </View>
        </View>

      </View>
    );
  });

  console.log('confirmWhat finished');

  return (
    <View style={{ marginTop: 0, marginRight: 10 }}>
      { layout }
    </View>
  );
};

export default ConfirmWhat;
