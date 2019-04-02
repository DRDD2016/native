/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Modal, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Fabric from 'react-native-fabric';
// import { store } from '../../init-store';
import { gotItWhatsNew } from '../../actions/profile';
import { ConfirmButton, ConfirmButtonText, ModalWrapper, ModalView } from '../../../styles';
import { ModalGeneralText, ModalMessageText } from '../../../styles/text';
import { feedVertPaddingScale } from '../../../styles/scaling';
import colours from '../../../styles/colours';

const { Answers } = Fabric;
// export const app_updateNo = 1;

class WhatsNew extends Component {


  onGotItClick () {

    const { app_updateNo, handleGotIt } = this.props;

    AsyncStorage.getItem('spark_token')
    .then((token) => {
      AsyncStorage.getItem('spark_user_id')
      .then((user_id) => {
        if (token && user_id) {
          console.log('token: ', token);
          console.log('user_id:', user_id);
          console.log('app_updateNo:', app_updateNo);
          console.log('showWhatsNew on GOt click:');
          handleGotIt(token, user_id, app_updateNo);
          // and dispatch action to set user Update No to current Update No
        }
      });
    });
  }


  render () {

    const { type, additionalInfo, eventCode, user_updateNo, app_updateNo } = this.props;
    Answers.logCustom('WhatsNew shown', { additionalData: additionalInfo });

    // console.log('whatsNew visible:', visible);
    console.log('type:', type);
    console.log('whatsNew user_updateNo:', user_updateNo);
    console.log('whatsNew app_updateNo:', app_updateNo);


    let showWhatsNew = false;

    if ((eventCode === 'none') || (!eventCode)) {
      if (user_updateNo !== undefined) {
        if (user_updateNo < app_updateNo) {
          // if an old updateNo, then show whatsnew
          showWhatsNew = true;
        } else {
          showWhatsNew = false;
        }
      } else {
        showWhatsNew = false;
      }
    } else {
      showWhatsNew = false;
    }

    console.log('showWhatsNew', showWhatsNew);
    // let showWelcome = false;
    //
    // if ((eventCode === 'none') || (!eventCode)) {
    //   if (user_updateNo === undefined) {
    //     // if no updateNo, then its a new user, so show welcome (in whatsnew for now)
    //     showWelcome = true;
    //   } else {
    //     showWelcome = false;
    //   }
    // } else {
    //   showWelcome = false;
    // }

    return (
      <Modal
        transparent
        animationType="slide"
        visible={showWhatsNew}
        onRequestClose={() => this.onGotItClick()}
      >
        {
          <ModalWrapper>

            {
              (type === 'whats_new') &&
              <ModalView>

                <ModalGeneralText>Spark has been updated</ModalGeneralText>

                <ModalGeneralText>{`${''}What's New?${''}`}</ModalGeneralText>
                <View style={{ paddingVertical: feedVertPaddingScale(20) }}>

                  <ModalMessageText style={{ color: colours.offWhite }}>
                    - bug fixes
                  </ModalMessageText>
                  <ModalMessageText style={{ color: colours.offWhite }}>
                    - improved UI
                  </ModalMessageText>
                  <ModalMessageText style={{ color: colours.offWhite }}>
                    - speed improvements
                  </ModalMessageText>

                </View>


                <ConfirmButton
                  style={{ width: 150, marginBottom: 20, marginTop: 20 }}
                  onPress={this.onGotItClick}

                >
                  <ConfirmButtonText>Got it</ConfirmButtonText>
                </ConfirmButton>


              </ModalView>
            }

            {
              (type === 'welcome') &&
              <ModalView>

                <ModalGeneralText>{`${''}Welcome to Spark${''}`}</ModalGeneralText>

                <ModalMessageText>
                  To get started, tap + to begin organising an event.
                </ModalMessageText>

                <ConfirmButton
                  style={{ width: 150, marginBottom: 20, marginTop: 20 }}
                  onPress={this.onGotItClick}

                >
                  <ConfirmButtonText>Got it</ConfirmButtonText>
                </ConfirmButton>


              </ModalView>
            }

          </ModalWrapper>
        }

      </Modal>

    );
  }


}

const mapStateToProps = state => ({

  user_updateNo: state.user.user_update_no,
  app_updateNo: state.app_meta.app_update_no,
  eventCode: state.network.inComingLinkCode
});

const mapDispatchToProps = dispatch => ({

  handleGotIt: (token, user_id, app_updateNo) => {
    dispatch(gotItWhatsNew(token, user_id, app_updateNo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WhatsNew);
