import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../../../styles/colours';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';
import { OptionText } from '../../../styles/text';
import { moderateScale } from '../../../styles/scaling';


const OFF_WHITE = colours.offWhite;

export default class CategoryButton extends Component {

  // constructor (props) {
  //   super(props);
  //
  //
  //   this.state = {
  //
  //   };
  // }


  componentDidMount () {
    console.log('categoryButton Did Mount');
  }

  shouldComponentUpdate (nextProps) {
    console.log('this.props.selectedNodeIndex', this.props.selectedNodeIndex);
    console.log('nextProps.selectedNodeIndex', nextProps.selectedNodeIndex);
    if (this.props.selectedNodeIndex === nextProps.selectedNodeIndex) {
      return false;
    }
    return true;

  }

  componentWillUpdate (nextProps) {
    if (nextProps !== this.props) {
      console.log('CategoryButton thisProps:', this.props);
      console.log('CategoryButton nextProps:', nextProps);
    } else {
      console.log('CategoryButton componentUpdatingAnyway');
    }

  }

  icons = {
    what: 'star',
    where: 'map-marker',
    when: 'calendar'
  }

  render () {
    const { category, datum, index, isToggleable, selectedNodeIndex, handleOnPress } = this.props;


    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{
          flex: 1,
          marginTop: 0,
          marginBottom: 0,
          elevation: 1,
          shadowColor: colours.shadowColour,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          backgroundColor: OFF_WHITE // must set as constant to stop IOS shadow warnings
        }}>
          <Icon.Button
            name={this.icons[category]}
            size={moderateScale(16)}
            borderRadius={5}
            style={{ paddingHorizontal: 10, paddingVertical: 8 }}
            color={(!isToggleable && colours[category]) || selectedNodeIndex ? OFF_WHITE : colours[category]}
            backgroundColor={(!isToggleable && OFF_WHITE) || selectedNodeIndex ? colours[category] : OFF_WHITE}
            onPress={() => handleOnPress(category, datum, index)}
          >
            {
              <View style={{ flex: 4 }}>
                <OptionText
                  style={{
                    color: (!isToggleable && colours[category]) || selectedNodeIndex
                    ? OFF_WHITE
                    : colours[category]
                  }}
                >
                  {category !== 'when' && (datum || 'TBC')}
                  {category === 'when' && `${formatDate(datum, 'half')}, ${formatTime(datum) || 'TBC'}`}
                </OptionText>
              </View>
            }
            {
              (!isToggleable && OFF_WHITE) || selectedNodeIndex
              ? <Icon name="check" size={20} style={{ textAlign: 'right', paddingLeft: 5 }} color={colours.white} />
              : <Text />
            }


          </Icon.Button>

        </View>
      </View>
    );
  }
}
