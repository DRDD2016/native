/* eslint-disable react/prefer-stateless-function */
/* eslint-disable */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Tips from 'react-native-tips';
import IconN from './../../components/general/icon';
import { scale, moderateScale, verticalScale } from '../../../styles/scaling';
import colours from '../../../styles/colours';
import { nextTips } from './../../actions/tips';

class CreateButton extends Component {


  render () {

    const { children, onPress, tipsNo, handleNextTips } = this.props;

    return (

      <View style={{

         }}
      >
        <Tips

          childrenStyle={{ justifyContent: 'center', alignItems: 'center' }}
          visible={tipsNo === 0}
          onRequestClose={() => handleNextTips()}
          delay={500}
          text={`You have no events ${'\n'}${'\n'}Tap this icon to get started`}
        >
          <TouchableOpacity onPress={() => onPress()}>
            <View>
              <IconN name="add" size={verticalScale(32)} color={colours.white} />
            </View>
          </TouchableOpacity>

        </Tips>

      </View>


    );
  }
}

const mapStateToProps = state => ({
  tipsNo: state.tips.tipsNo
});

const mapDispatchToProps = dispatch => ({

  handleNextTips: () => {
    dispatch(nextTips());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateButton);
