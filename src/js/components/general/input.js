import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const Input = ({ handleChange, value, placeholder, removeInput, inputKey, testDescription }) => {

  return (
    <View style={ styles.row }>

      <TextInput
        accessibilityLabel={testDescription}
        underlineColorAndroid="transparent"
        placeholder={ placeholder }
        autoCorrect={ false }
        value={ value }
        onChangeText={ text => handleChange(text, inputKey) }
        style={[styles.inputStyle, { height: 38, borderColor: colours.what, borderWidth: 1, borderRadius: 5 }]}
      />
      <View style={ [styles.shortRow, { alignItems: 'center' }] }>

        { (inputKey === 0) &&
          <View />
        }
        { (inputKey !== 0) &&
          <Button buttonStyle={[styles.smallButtonStyle, { justifyContent: 'center' }]} onPress={ () => removeInput(inputKey) }>
            <Icon name="times" size={16} color="gray" />
          </Button>
        }
      </View>
    </View>
  );
};

export default Input;
