import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, { AddButton } from '../../../styles';
import colours from '../../../styles/colours';

const AddInput = ({ data, handler, testDescription, colour }) => {

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      { (data.length >= 4) &&
        <View />
      }
      { (data.length < 4) &&
        <View style={[styles.row, { alignItems: 'center', justifyContent: 'center', marginTop: 0, marginBottom: 10, flex: 1 }]}>
          <View style={{ flex: 1 }} />

          <AddButton
            testDescription={testDescription}
            onPress={ () => handler(data.length) }
            color={colour}
          >
            <Icon name="plus" size={16} color={colours.offWhite} />
          </AddButton>

          <View style={{ flex: 1 }}>
            <Text style={ styles.msg4 }>tap to add an option</Text>
          </View>

        </View>
      }
    </View>
  );
};

export default AddInput;
