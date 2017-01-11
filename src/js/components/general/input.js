import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import styles from '../../../styles';

const Input = ({ handleChange, value, placeholder, removeInput, inputKey }) => {

  return (
    <View style={ styles.row }>

      <TextInput
        placeholder={ placeholder }
        autoCorrect={ false }
        value={ value }
        onChangeText={ text => handleChange(text, inputKey) }
        style={ styles.inputStyle }
      />
      <View style={ styles.shortRow }>

        { (inputKey === 0) &&
          <View />
        }
        { (inputKey !== 0) &&
          <Button buttonStyle={styles.smallButtonStyle} onPress={ () => removeInput(inputKey) }>
            <Icon name="times" size={14} color="gray" />
          </Button>
        }
      </View>
    </View>
  );
};

export default Input;
