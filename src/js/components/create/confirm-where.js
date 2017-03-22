/* eslint-disable */
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import styles from '../../../styles';

const ConfirmWhere = ({ data }) => { // eslint-disable-line react/prop-types

  const layout = data.map((datum, i) => {

    const hideTitle = i > 0;

    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center' }}
        key={ i }
      >
        { (hideTitle) &&
          <View style={{ flex: 50, marginHorizontal: 5 }} />
        }
        { (!hideTitle) &&
          <View style={{ flex: 50, marginHorizontal: 5 }}>
            <Text style={styles.optionTitleWhere}>
              Where
            </Text>
          </View>
        }
        <View
          style={{ flex: 250 }}
        >
          <View style={{ }}>
            <Button buttonStyle={styles.optionSelectedWhere} textStyle={[styles.optionTextSelected, {lineHeight: 20}]}>
              <Icon name="map-marker" size={18} color="white" />
              {'  '}
              { datum || 'TBC' }
            </Button>
          </View>
        </View>
      </View>
    );
  });

  return (
    <View style={{ marginVertical: 10, marginRight: 10 }}>
      { layout }
    </View>
  );
};

export default ConfirmWhere;
