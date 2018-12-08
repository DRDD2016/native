import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import colours from '../../../styles/colours';

const labelStyle = {
  color: colours.main
};

const optionalStyle = {
  color: colours.gray
};

const containerStyle = {
  flex: 1,
  flexDirection: 'row',
  // borderColor: 'red',
  // borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 0,
  maxWidth: 700
};

const inputStyle = {
  color: colours.darkgray,
  marginTop: 4,
  marginBottom: 2,
  paddingHorizontal: 10,
  paddingBottom: 4,
  fontSize: 16,
  fontWeight: '400',
  height: 45,
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
      <View style={containerStyle}>
        <View style={{
          width: '100%',
          // borderColor: 'green',
          // borderWidth: 1,
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
            {
              <Text style={labelStyle}>
                {labelText}
              </Text>
            }
            { optional &&
              <Text style={optionalStyle}>
                {' - Optional'}
              </Text>
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
