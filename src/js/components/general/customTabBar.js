/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-navigation';
// import Button from '../common/Button';
import colours from '../../../styles/colours';
// import { moderateScale } from '../../../styles/scaling';


const TABBAR_HEIGHT = Header.HEIGHT;

export default class CustomTabBar extends Component {

  constructor (props) {
    super(props);

    this.state = {
      // selected: 'selected tab'
    };
  }

  render () {
      console.log('render CustomTabBar');
      // console.log('this.props tabbar', this.props);
      return (
        <View style={{ flexDirection: 'row', height: TABBAR_HEIGHT, backgroundColor: colours.background }}>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon
              name="image"
              color={colours.headerButtonColor}
              size={32}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon
              name="calendar"
              color={colours.headerButtonColor}
              size={32}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{ width: TABBAR_HEIGHT * 1.3,
                height: TABBAR_HEIGHT * 1.3,
                borderRadius: 60,
                backgroundColor:
                colours.main,
                alignItems: 'center',
                justifyContent: 'center' }}
            >
              <Icon name="plus" size={32} color={colours.white} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon
              name="envelope"
              color={colours.headerButtonColor}
              size={32}
              />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon
              name="user"
              color={colours.headerButtonColor}
              size={32}
              />
          </TouchableOpacity>

        </View>
      );
  }
}
