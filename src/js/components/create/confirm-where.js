/* eslint-disable */
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import styles from '../../../styles';

const ConfirmEventWhere = ({ eventWhere }) => { // eslint-disable-line react/prop-types

  const layout = eventWhere.map((data, i) => {

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
            <Text style={styles.optionTitleWhere}>
              Where
            </Text>
          </View>
        }
        <View
          style={styles.columnMiddle}
        >
          <View style={styles.rowSpaced}>
            <Button buttonStyle={styles.optionSelectedWhere} textStyle={styles.optionTextSelected}>
              <Icon name="map-marker" size={18} color="white" />
              {'  '}
              { data.placeName || 'TBC' }
              { data.placeAddress }
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

export default ConfirmEventWhere;
