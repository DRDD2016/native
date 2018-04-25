/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text, Modal, TouchableHighlight, AsyncStorage } from 'react-native';
import Fabric from 'react-native-fabric';
import { store } from '../../init-store';
import { gotItWhatsNew } from '../../actions/profile';
import styles from '../../../styles';

const { Answers } = Fabric;
export const appUpdateNo = 1;

export default function WhatsNew ({ visible, userUpdateNo, type, onClose, additionalInfo }) {

  Answers.logCustom('WhatsNew shown', { additionalData: additionalInfo });
  
  console.log('userUpdateNo:', userUpdateNo);

  return (
    <Modal
      transparent animationType={'slide'} visible={visible}
      onRequestClose={onClose}
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

              <View style={{ flex: 1 }}>
                <TouchableHighlight
                  style={ [styles.confirmButton, { marginBottom: 20, marginTop: 20 }] }
                  onPress={ () => {
                    onClose();

                    AsyncStorage.getItem('spark_token')
                    .then((token) => {
                      AsyncStorage.getItem('spark_user_id')
                      .then((user_id) => {
                        if (token && user_id) {
                          store.dispatch(gotItWhatsNew(token, user_id, appUpdateNo));
                          // and dispatch action to set user Update No to current Update No
                        }
                      });
                    });

                  }}
                >
                  <Text style={styles.confirmButtonText}>Got it</Text>
                </TouchableHighlight>
              </View>


            </View>
          }

        </View>
      }

    </Modal>

  );
}
