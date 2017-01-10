/* eslint-disable */
import React from 'react';
import { View, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import styles from '../../../styles';

const ConfirmEventWhat = ({ eventWhat }) => {

  const layout = Object.keys(eventWhat).map((data, i) => {

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
              <Text>s</Text>
              {'  '}
              { eventWhat[data] || 'TBC' }
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

export default ConfirmEventWhat;
