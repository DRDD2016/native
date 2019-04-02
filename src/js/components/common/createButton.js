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

    const { children, onPress, tipsNo, handleNextTips, user_updateNo, app_updateNo } = this.props;

    console.log('createButton user_updateNo', user_updateNo);
    console.log('createButton app_updateNo', app_updateNo);
    const visible = (user_updateNo === app_updateNo) && (tipsNo === 0)
    return (

      <View style={{

         }}
      >
        <Tips

          childrenStyle={{ justifyContent: 'center', alignItems: 'center' }}
          visible={visible}
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
  tipsNo: state.tips.tipsNo,
  user_updateNo: state.user.user_update_no,
  app_updateNo: state.app_meta.app_update_no,
  eventCode: state.network.inComingLinkCode
});

const mapDispatchToProps = dispatch => ({

  handleNextTips: () => {
    dispatch(nextTips());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateButton);
