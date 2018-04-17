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
        style={{ flexDirection: 'row', alignItems: 'center' }}
        key={ i }
      >
        { (hideTitle) &&
          <View style={{ flex: 150, marginHorizontal: 5 }} />
        }
        { (!hideTitle) &&
          <View style={{ flex: 150, marginHorizontal: 5 }}>
            <Title3 color={colours.what}>
              What
            </Title3>
          </View>
        }
        <View
          style={{ flex: 800 }}
          key={ i }
        >
          <View style={{}}>
            <View>
              <ButText color={colours.what}>
                <Icon name="star" size={18} color={colours.what} />
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
