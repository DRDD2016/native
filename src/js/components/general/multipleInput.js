import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import InputField from './inputField';
import styles from '../../../styles';

const inputCardStyle = {
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 15,
    minHeight: 32,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'darkgray',
    shadowOffset: { height: 2, width: 0 }
};


const MultipleInput = (props) => {

  const { labelType, labelText, handleChange, value, placeholder, removeInput, inputKey, testDescription, focussedColor, unfocussedColor } = props;
  console.log('labelText', labelText);
  console.log('labelType', labelType);

  return (
    <View style={[inputCardStyle, {
      }] }
    >

      <InputField
        testDescription={testDescription}
        underlineColorAndroid="transparent"
        placeholder={ placeholder }
        autoCorrect={ false }
        value={ value }
        labelType={labelType}
        label={ labelText }
        inputKey= { inputKey }
        onChangeText={ text => handleChange(text, inputKey) }
        focussedColor={ focussedColor }
        unfocussedColor={ unfocussedColor }
      />
      <View style={ [styles.shortRow, { alignItems: 'center', justifyContent: 'center' }] }>

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

export default MultipleInput;
