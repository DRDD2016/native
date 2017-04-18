/* eslint-disable */
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const ConfirmWhat = ({ data }) => {

  const layout = data.map((datum, i) => {

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
            <Text style={[styles.title3, { flex: 1, color: colours.what, paddingTop: 4 }]}>
              What
            </Text>
          </View>
        }
        <View
          style={{ flex: 800 }}
          key={ i }
        >
          <View style={{}}>
            <Button
            buttonStyle={{
              flex: 1,
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 15,
              paddingRight: 15 }}
            textStyle={[styles.title4, {
              flex: 1,
              color: colours.what,
              justifyContent: 'space-around',
              lineHeight: 20 }]}
          >
              <Icon name="star" size={18} color={colours.what} />
              {'  '}
              { datum || 'TBC' }
            </Button>
          </View>
        </View>

      </View>
    );
  });

  return (
    <View style={{ marginTop: 0, marginRight: 10 }}>
      { layout }
    </View>
  );
};

export default ConfirmWhat;
