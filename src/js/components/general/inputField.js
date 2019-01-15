import React, { Component } from 'react';
import { TextInput, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  width: '100%',
  height: iconScale(45), // looks to do nothing on Android, check IOS
  flexDirection: 'row',
  // elevation: 1, // replaces shadow on Android, shadow props IOS only
  // shadowOpacity: 0.75,
  // shadowRadius: 5,
  // shadowColor: 'darkgray',
  // shadowOffset: { height: 2, width: 0 },
  backgroundColor: 'transparent',
  overflow: 'hidden', // does nothing on android, check IOS
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
      focussedColor, unfocussedColor, autoCapitalize, iconName, secureTextEntry
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
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 600
      }}>
        <View style={{
          width: '95%',
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
          <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'flex-start', alignItems: 'flex-end' }}>
            <View style={{ flex: 1 }}>
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
                secureTextEntry={secureTextEntry}
              />
            </View>
            {
              iconName &&
              <View style={{
                marginBottom: iconScale(2),
                aspectRatio: 1 / 1, // width / height
                height: Platform === 'ios' ? iconScale(45) : iconScale(45) * 1.5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colours.blue
              }}>
                <Icon size={iconScale(40)} name={iconName} color="rgba(255, 255, 255, 0.76)" />
              </View>
            }
          </View>
        </View>

      </View>


    );
  }
}

export default InputField;
