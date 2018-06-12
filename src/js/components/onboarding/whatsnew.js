/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Text, Modal, AsyncStorage } from 'react-native';
import Fabric from 'react-native-fabric';
import { store } from '../../init-store';
import { gotItWhatsNew } from '../../actions/profile';
import { styles, ConfirmButton, ConfirmButtonText } from '../../../styles';

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
          <View style={styles.modalWrapper}>

            {
              (type === 'whats_new') &&
              <View style={styles.modalConfirm}>

                <Text style={[styles.msg2, { flex: 1 }]}>Spark has been updated</Text>

                <Text style={[styles.msg1, { flex: 1 }]}>{`${''}What's New${''}`}</Text>

                <View style={{ flex: 1 }}>
                  <Text style={[styles.msg2, { flex: 1 }]}>
                    - bug fixes
                  </Text>
                  <Text style={[styles.msg2, { flex: 1 }]}>
                    - whats new
                  </Text>
                  <Text style={[styles.msg2, { flex: 1 }]}>
                    - on boarding
                  </Text>
                </View>

                <View style={[styles.rowCentered, { flex: 1 }]}>
                  <ConfirmButton
                    style={{ width: 150, marginBottom: 20, marginTop: 20 }}
                    onPress={this.onGotItClick}

                  >
                    <ConfirmButtonText>Got it</ConfirmButtonText>
                  </ConfirmButton>
                </View>

              </View>
            }

            {
              (type === 'welcome') &&
              <View style={styles.modalConfirm}>

                <Text style={[styles.msg2, { flex: 0.3 }]}>{' '}</Text>

                <Text style={[styles.msg1, { flex: 1 }]}>{`${''}Welcome to Spark${''}`}</Text>

                <View style={{ flex: 1.3 }}>
                  <Text style={[styles.msg2, { flex: 1 }]}>
                    The app that helps you sort your social life
                  </Text>
                  <Text style={[styles.msg2, { flex: 1 }]}>
                    To get started, tap Create to begin organising an event.
                  </Text>
                </View>

                <View style={{ flex: 0.2 }} />

                <View style={[styles.rowCentered, { flex: 1 }]}>
                  <ConfirmButton
                    style={{ width: 150, marginBottom: 20, marginTop: 20 }}
                    onPress={this.onGotItClick}

                  >
                    <ConfirmButtonText>Got it</ConfirmButtonText>
                  </ConfirmButton>
                </View>

                <View style={{ flex: 0.2 }} />


              </View>
            }

          </View>
        }

      </Modal>

    );
  }


}
