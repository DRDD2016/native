/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text, Modal, TouchableHighlight } from 'react-native';
import Fabric from 'react-native-fabric';
import { store } from '../../init-store';
import { saveIncomingLinkError } from '../../actions/network';
import { eventConfirmedSuccess } from '../../actions/create';
import { finishedUpdateRsvpSuccess } from '../../actions/event/data';
import Spinner from '../common/Spinner';
import styles from '../../../styles';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';


const { Answers } = Fabric;

export default function SpinnerModal ({ visible, type, isConnected, onClose, eventCodeError, additionalInfo, goBack }) {

  console.log('SpinnerModal visible:', visible);
  console.log('SpinnerModal type:', type);
  console.log('SpinnerModal isConnected:', isConnected);
  console.log('SpinnerModal additionalInfo:', additionalInfo);
  Answers.logCustom('Spinner activated', { additionalData: additionalInfo });


  return (
    <Modal
      transparent animationType={'slide'} visible={visible}
      onRequestClose={onClose}
    >
      {
        <View style={styles.modalWrapper}>
          {
            (type === 'confirming_event') &&
            <View style={styles.modalConfirm}>

              <Text style={[styles.msg1, { flex: 1 }]}>Confirming event</Text>
              <Text style={[styles.msg2, { flex: 1 }]}>please wait...</Text>
              <View style={{ flex: 1 }}>
                <Spinner size="large" />
              </View>
              {
                // additionalInfo && <Text style={[styles.msg2, { flex: 1 }]}>{additionalInfo}</Text>
              }
              <View style={{ flex: 1 }} />

            </View>
          }

          {

            (type === 'event_confirmed') &&
            <View style={styles.modalConfirm}>

              <Text style={[styles.msg1, { flex: 1 }]}>Event confirmed</Text>
              <Text style={[styles.msg2, { flex: 1 }]}>Your event is now confirmed:</Text>
              <View style={{ flex: 1 }}>

                <Text style={styles.msg3}>{additionalInfo.what[0] !== '' ? `What: ${additionalInfo.what[0]}` : ''}</Text>
                <Text style={styles.msg3}>{additionalInfo.where[0] !== '' ? `Where: ${additionalInfo.where[0]}` : ''}</Text>
                <Text style={styles.msg3}>
                  When: {formatDate(additionalInfo.when[0])} {formatTime(additionalInfo.when[0])}
                </Text>

              </View>
              <View style={{ flex: 1 }}>
                <TouchableHighlight
                  style={ [styles.confirmButton, { marginBottom: 20, marginTop: 20 }] }
                  onPress={ () => {
                    console.log('OK clicked');
                    store.dispatch(eventConfirmedSuccess());

                    goBack();

                  }}
                >
                  <Text style={styles.confirmButtonText}>OK</Text>
                </TouchableHighlight>
              </View>

              {
                // additionalInfo && <Text style={[styles.msg2, { flex: 1 }]}>{additionalInfo}</Text>
              }
              <View style={{ flex: 1 }} />

            </View>
          }

          {

            (type === 'rsvp_finished') &&
            <View style={styles.modalConfirm}>

              <Text style={[styles.msg1, { flex: 1 }]}>Response sent</Text>
              <Text style={[styles.msg2, { flex: 1 }]}>Your response has been sent</Text>
              <View style={{ flex: 1 }} />

              <View style={{ flex: 1 }}>
                <TouchableHighlight
                  style={ [styles.confirmButton, { marginBottom: 20, marginTop: 20 }] }
                  onPress={ () => {
                    console.log('OK clicked');
                    store.dispatch(finishedUpdateRsvpSuccess());

                    goBack(); // check this

                  }}
                >
                  <Text style={styles.confirmButtonText}>OK</Text>
                </TouchableHighlight>
              </View>

              {
                // additionalInfo && <Text style={[styles.msg2, { flex: 1 }]}>{additionalInfo}</Text>
              }
              <View style={{ flex: 1 }} />

            </View>
          }


          {
            (type === 'share_invite') &&
            <View style={styles.modalConfirm}>

              <Text style={[styles.msg1, { flex: 1 }]}>Sharing invite</Text>
              <Text style={[styles.msg2, { flex: 1 }]}>please wait...</Text>
              <View style={{ flex: 1 }}>
                <Spinner size="large" />
              </View>
              {
                additionalInfo && <Text style={[styles.msg2, { flex: 1 }]}>{additionalInfo}</Text>
              }
              <View style={{ flex: 1 }} />

            </View>
          }

          {
            (type === 'loading') &&
            <View style={styles.modalConfirm}>

              <Text style={[styles.msg1, { flex: 1 }]}>Loading</Text>
              <Text style={[styles.msg2, { flex: 1 }]}>please wait...</Text>
              <View style={{ flex: 1 }}>
                <Spinner size="large" />
              </View>
              {!isConnected && <Text style={[styles.msg2, { flex: 1 }]}>poor internet connection</Text>}
              {
                // isFetchingBranch && <Text style={[styles.msg2, { flex: 1 }]}>{`isFetchingBranch: ${isFetchingBranch}`}</Text>
              }
              {
                // isFetching && <Text style={[styles.msg2, { flex: 1 }]}>{`isFetching: ${isFetching}`}</Text>
              }
              {
                additionalInfo && <Text style={[styles.msg2, { flex: 1 }]}>{additionalInfo}</Text>
              }

              <View style={{ flex: 1 }} />

            </View>
          }

          {
            (type === 'event_code_error') &&
            <View style={styles.modalConfirm}>
              <Text style={[styles.msg1, { flex: 1 }]}>Poor connectivity</Text>
              <Text style={[styles.msg2, { flex: 1 }]}>please check your internet connection</Text>
              <Text style={[styles.msg2, { flex: 1 }]}>{`eventCodeError: ${eventCodeError}`}</Text>
              <View style={{ flex: 1 }} />

              {
                additionalInfo && <Text style={[styles.msg2, { flex: 1 }]}>{additionalInfo}</Text>
              }

              <View style={{ flex: 1 }}>
                <TouchableHighlight
                  style={ [styles.confirmButton, { marginBottom: 20, marginTop: 20 }] }
                  onPress={ () => {
                    onClose();
                    store.dispatch(saveIncomingLinkError(undefined));
                    // and dispatch action to remove event code error?

                  }}
                >
                  <Text style={styles.confirmButtonText}>OK</Text>
                </TouchableHighlight>
              </View>

            </View>
          }

        </View>
      }

    </Modal>

  );
}
