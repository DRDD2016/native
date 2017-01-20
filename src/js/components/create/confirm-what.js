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
        style={styles.pollSection}
        key={ i }
      >
        { (hideTitle) &&
          <View style={styles.columnLeft} />
        }
        { (!hideTitle) &&
          <View style={styles.columnLeft}>
            <Text style={styles.optionTitleWhat}>
              What
            </Text>
          </View>
        }
        <View
          style={styles.columnMiddle}
          key={ i }
        >
          <View style={styles.rowSpaced}>
            <Button buttonStyle={styles.optionSelectedWhat} textStyle={styles.optionTextSelected}>
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
    <View>
      { layout }
    </View>
  );
};

export default ConfirmWhat;
