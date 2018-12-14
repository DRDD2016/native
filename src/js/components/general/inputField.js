import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import colours from '../../../styles/colours';
import { ms14, FormLabelText } from '../../../styles/text';
import { iconScale } from '../../../styles/scaling';


const inputStyle = {
  color: colours.darkgray,
  marginTop: iconScale(4),
  marginBottom: iconScale(2),
  paddingHorizontal: iconScale(10),
  paddingBottom: iconScale(4),
  fontSize: ms14,
  fontWeight: '400',
  height: iconScale(45),
  width: '100%',
  flexDirection: 'row',
  // elevation: 1, // replaces shadow on Android, shadow props IOS only
  // shadowOpacity: 0.75,
  // shadowRadius: 5,
  // shadowColor: 'darkgray',
  // shadowOffset: { height: 2, width: 0 },
  backgroundColor: 'transparent',
  overflow: 'hidden',
  borderWidth: 0, // remove to put back border
  borderBottomColor: colours.main,
  borderBottomWidth: 2, // remove 'Bottom' to make full border
  borderRadius: 0, // 5
  alignSelf: 'flex-start',
  justifyContent: 'center'
};

class InputField extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isFocused: false
    };
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
  }

  handleBlur = () => {
    this.setState({ isFocused: false });
  }

  render () {

    const {
      multiline, numberOfLines, labelType, value, placeholder,
      onChangeText, testDescription, label, inputKey, optional,
      focussedColor, unfocussedColor, autoCapitalize
    } = this.props;
    const focusedColor = !focussedColor ? colours.main : focussedColor;
    const unfocusedColor = !unfocussedColor ? colours.lightgray : unfocussedColor;
    console.log('labelType', labelType);
    console.log('this.props', this.props);
    const labelPoll = `${label} - Option ${inputKey + 1}`;
    const labelNotPoll = `${label}`;
    const labelText = labelType === 'poll' ? labelPoll : labelNotPoll;

    return (
      <View
        style={{ flexDirection: 'row',
        // borderColor: 'green',
        // borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 600
      }}>
        <View style={{
          width: '90%',
          // borderColor: 'green',
          // borderWidth: 1,
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
            {
              <FormLabelText>
                {labelText}
              </FormLabelText>
            }
            { optional &&
              <FormLabelText style={{ color: colours.gray }}>
                {' - Optional'}
              </FormLabelText>
            }
          </View>
          <TextInput
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            accessibilityLabel={testDescription}
            underlineColorAndroid="transparent"
            placeholder={ placeholder }
            autoCorrect={ false }
            value={ value }
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            style={[inputStyle, {
              borderColor: this.state.isFocused ? focusedColor : unfocusedColor,
              height: multiline ? null : null
            }]}
            multiline={multiline}
            numberOfLines={numberOfLines} // check if does anything on android, else delete
          />
        </View>
      </View>


    );
  }
}

export default InputField;
