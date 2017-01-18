/* eslint-disable */
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';
import styles from '../../../styles';

const ConfirmEventWhen = ({ eventWhen }) => { // eslint-disable-line react/prop-types
  const layout = eventWhen.map((data, i) => {
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
            <Text style={styles.optionTitleWhen}>
              When
            </Text>
          </View>
        }
        <View style={styles.columnMiddle}>
          <View style={styles.rowSpaced}>
            <Button buttonStyle={styles.optionSelectedWhen} textStyle={styles.optionTextSelected}>
              <Icon name="calendar" size={18} color="white" />
              {'  '}
              { formatDate(data.date) || 'TBC' }
              {'  '}
              <Icon name="clock-o" size={18} color="white" />
              {'  '}
              { formatTime(data.time) || 'TBC' }
            </Button>
          </View>
        </View>
      </View>
    );
  });

  return (
    <View
      style={styles.confirmList}
    >
      { layout }
    </View>
  );
};

export default ConfirmEventWhen;
