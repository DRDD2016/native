import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const AddInput = ({ data, handler, testDescription, colour }) => {

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      { (data.length >= 3) &&
        <View />
      }
      { (data.length < 3) &&
        <View style={[styles.row, { alignItems: 'center', justifyContent: 'center', marginTop: 0, marginBottom: 0, flex: 1 }]}>
          <View style={{ flex: 1 }} />

          <Button
            testDescription={testDescription}
            buttonStyle={[styles.addButtonStyle, { opacity: 0.8, backgroundColor: colour }]}
            textStyle={styles.addButtonTextStyle}
            onPress={ () => handler(data.length) }
          >
            <Icon name="plus" size={16} color={colours.white} />
          </Button>

          <View style={{ flex: 1 }}>
            <Text style={ styles.msg4 }>tap to add an option</Text>
          </View>

        </View>
      }
    </View>
  );
};

export default AddInput;
