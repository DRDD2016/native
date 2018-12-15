/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Modal, AsyncStorage } from 'react-native';
import Fabric from 'react-native-fabric';
import { store } from '../../init-store';
import { gotItWhatsNew } from '../../actions/profile';
import { ConfirmButton, ConfirmButtonText, ModalWrapper, ModalView } from '../../../styles';
import { ModalGeneralText, ModalMessageText } from '../../../styles/text';
import { feedVertPaddingScale } from '../../../styles/scaling';
import colours from '../../../styles/colours';

const { Answers } = Fabric;
export const app_updateNo = 1;

export default class WhatsNew extends Component {


  onGotItClick () {

    console.log('clicked');

    AsyncStorage.getItem('spark_token')
    .then((token) => {
      AsyncStorage.getItem('spark_user_id')
      .then((user_id) => {
        if (token && user_id) {
          console.log('token: ', token);
          console.log('user_id:', user_id);
          console.log('app_updateNo:', app_updateNo);
          store.dispatch(gotItWhatsNew(token, user_id, app_updateNo));
          // and dispatch action to set user Update No to current Update No
        }
      });
    });
  }


  render () {

    const { type, additionalInfo, visible } = this.props;
    Answers.logCustom('WhatsNew shown', { additionalData: additionalInfo });

    console.log('whatsNew visible:', visible);
    console.log('type:', type);

    return (
      <Modal
        transparent
        animationType="slide"
        visible={visible}
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
