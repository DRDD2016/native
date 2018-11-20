import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

class Input extends Component {

  // constructor (props) {
  //   super(props);
  //
  //
  // }
  //
  //

  render () {

    const { handleChange, value, placeholder, removeInput, inputKey, testDescription } = this.props;

    return (
      <View style={[styles.row, {
        padding: 10,
        paddingLeft: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 1,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'darkgray',
        shadowOffset: { height: 2, width: 0 } }] }>

        <TextInput
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          accessibilityLabel={testDescription}
          underlineColorAndroid="transparent"
          placeholder={ placeholder }
          autoCorrect={ false }
          value={ value }
          onChangeText={ text => handleChange(text, inputKey) }
          style={[styles.inputStyle, { height: 38,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: this.state.isFocused ? colours.what : 'red'
          }]}
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
  }
}

export default Input;
