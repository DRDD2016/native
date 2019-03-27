/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text, Modal } from 'react-native';
import Fabric from 'react-native-fabric';
import { store } from '../../init-store';
import { saveIncomingLinkError } from '../../actions/network';
import { eventConfirmedSuccess } from '../../actions/create';
import { finishedUpdateRsvpSuccess } from '../../actions/event/data';
import Spinner from '../common/Spinner';
import styles, { ConfirmButton, ModalWrapper, ModalView } from '../../../styles';
import { ConfirmButtonText, GeneralText, MessageText } from '../../../styles/text';
import colours from '../../../styles/colours';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';


const { Answers } = Fabric;

export default function SpinnerModal ({ visible, type, isConnected, onClose, eventCodeError, additionalInfo, goBack }) {

  console.log('SpinnerModal visible:', visible);
  console.log('SpinnerModal type:', type);
  console.log('type === event_confirmed', type === 'event_confirmed');
  // console.log('SpinnerModal isConnected:', isConnected);
  // console.log('SpinnerModal additionalInfo:', additionalInfo);
  console.log('eventCodeError', eventCodeError);
  Answers.logCustom('Spinner activated', { additionalData: additionalInfo });


  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      {
        <ModalWrapper>
          {
            (type === 'confirming_event') &&
            <ModalView>

              <Text style={[styles.msg1, { flex: 1 }]}>Confirming event</Text>
              <Text style={[styles.msg2, { flex: 1 }]}>please wait...</Text>
              <View style={{ flex: 1 }}>
                <Spinner size="large" />
              </View>
              {
                // additionalInfo && <Text style={[styles.msg2, { flex: 1 }]}>{additionalInfo}</Text>
              }
              <View style={{ flex: 1 }} />

            </ModalView>
          }

          {

            (type === 'event_confirmed') &&
            <ModalView>
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
                  <ConfirmButton
                    testDescription="EVENT CONFIRMED OK"
                    style={{ backgroundColor: colours.green }}
                    onPress={ () => {

                      store.dispatch(eventConfirmedSuccess());

                      goBack();

                    }}
                  >
                    <ConfirmButtonText>
                      OK
                    </ConfirmButtonText>
                  </ConfirmButton>
                </View>

                {
                  // additionalInfo && <Text style={[styles.msg2, { flex: 1 }]}>{additionalInfo}</Text>
                }
                <View style={{ flex: 1 }} />

              </View>
            </ModalView>
          }

          {

            (type === 'rsvp_finished') &&
            <ModalView>

              <Text style={[styles.msg1, { flex: 1 }]}>Response sent</Text>
              <Text style={[styles.msg2, { flex: 1 }]}>Your response has been sent</Text>
              <View style={{ flex: 1 }} />

              <View style={{ flex: 1 }}>

                <ConfirmButton
                  testDescription="RSVP FINISHED OK"
                  style={{ backgroundColor: colours.green }}
                  onPress={ () => {
                    console.log('OK clicked');
                    store.dispatch(finishedUpdateRsvpSuccess());

                    goBack(); // check this

                  }}
                >
                  <ConfirmButtonText>
                    OK
                  </ConfirmButtonText>
                </ConfirmButton>
              </View>

              {
                // additionalInfo && <Text style={[styles.msg2, { flex: 1 }]}>{additionalInfo}</Text>
              }
              <View style={{ flex: 1 }} />

            </ModalView>
          }


          {
            (type === 'share_invite') &&
            <ModalView>

              <Text style={[styles.msg1, { flex: 1 }]}>Sharing invite</Text>
              <Text style={[styles.msg2, { flex: 1 }]}>please wait...</Text>
              <View style={{ flex: 1 }}>
                <Spinner size="large" />
              </View>
              {
                additionalInfo && <Text style={[styles.msg2, { flex: 1 }]}>{additionalInfo}</Text>
              }
              <View style={{ flex: 1 }} />

            </ModalView>
          }

          {
            (type === 'loading') &&
            <ModalView>

              <GeneralText style={[{ color: colours.white, paddingVertical: 12 }]}>Loading</GeneralText>
              <MessageText style={[{ color: colours.lightgray, paddingVertical: 4 }]}>please wait...</MessageText>
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
                additionalInfo && <MessageText style={{ flex: 1 }}>{additionalInfo}</MessageText>
              }

              <View style={{ flex: 1 }} />

            </ModalView>
          }

          {
            (type === 'event_code_error') &&
            <ModalView>
              <Text style={[styles.msg1, { flex: 1 }]}>Poor connectivity</Text>
              <Text style={[styles.msg2, { flex: 1 }]}>please check your internet connection</Text>
              {
                // <Text style={[styles.msg2, { flex: 1 }]}>{`eventCodeError: ${eventCodeError}`}</Text>
              }
              <View style={{ flex: 1 }} />

              {
                additionalInfo && <Text style={[styles.msg2, { flex: 1 }]}>{additionalInfo}</Text>
              }

              <View style={{ flex: 1 }}>
                <ConfirmButton
                  testDescription="EVENT CODE ERROR OK"
                  style={{ backgroundColor: colours.green }}
                  onPress={ () => {
                    onClose();
                    store.dispatch(saveIncomingLinkError(undefined));
                    // and dispatch action to remove event code error?

                  }}
                >
                  <ConfirmButtonText>
                    OK
                  </ConfirmButtonText>
                </ConfirmButton>
              </View>

            </ModalView>
          }

        </ModalWrapper>
      }

    </Modal>

  );
}
