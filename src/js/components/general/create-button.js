/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AddCreateButton } from '../../../styles';
import colours from '../../../styles/colours';
import { verticalScale } from '../../../styles/scaling';

class CreateButton extends Component {

  render () {

    return (
      <View style={{
               position: 'absolute',
               alignItems: 'center'
      }}>
        <AddCreateButton style={{ }}>
          <Icon name="plus" size={verticalScale(28)} color={colours.white} />
        </AddCreateButton>

      </View>
    );

  }

}

export default CreateButton;
