/* eslint-disable */
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import styles from '../../../styles';

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
            <Text style={styles.optionTitleWhat}>
              What
            </Text>
          </View>
        }
        <View
          style={{ flex: 800 }}
          key={ i }
        >
          <View style={{}}>
            <Button buttonStyle={styles.optionSelectedWhat} textStyle={[styles.optionTextSelected, {lineHeight: 20}]}>
              <Icon name="star" size={18} color="white" />
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

export default ConfirmWhat;
