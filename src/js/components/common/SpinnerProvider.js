import React, { Component } from 'react';
import { View } from 'react-native';
import SpinnerModal from './SpinnerModal';


export default class SpinnerProvider extends Component {

  componentWillMount () {
    console.log('Spinner props mount: ', this.props);
  }

  componentWillReceiveProps (nextProps) {
    console.log('Spinner props this props: ', this.props);
    console.log('Spinner props nextProps: ', nextProps);
  }

  render () {
    console.log('Spinner render: ', this.props);
    const {
      isReceivingFeed,
      isFetchingFeed,
      isConnected,
      eventCodeError,
      isFetchingBranch,
      saveEventStatus,
      isFetchingEvent,
      isFetchingCreate,
      isConfirmingEvent,
      isEventConfirmed,
      isFinishedUpdatingRsvp,
      finalChoices,
      goBack } = this.props;

    const isLoading = isFetchingBranch || isReceivingFeed || isFetchingFeed || isFetchingEvent || isFetchingCreate;

    const isErrorModalVisible = () => {
      if (!eventCodeError) {
        return false;
      }
      return true;
    };

    const errorModalVisible = isErrorModalVisible();


    console.log('errorModalVisible', errorModalVisible);
    console.log('isFetchingCreate:', isFetchingCreate);
    console.log('isReceivingFeed:', isReceivingFeed);
    console.log('isConfirmingEvent:', isConfirmingEvent);
    console.log('isEventConfirmed:', isEventConfirmed);
    console.log('finalChoices:', finalChoices);
    console.log('isLoading:', isLoading);
    console.log('isFetchingBranch:', isFetchingBranch);
    // console.log('this.props.children:', this.props.children);

    return (
      <View style={{ flex: 1, borderColor: 'pink', borderWidth: 0 }}>
        {React.Children.only(this.props.children)}
        {
          (isConfirmingEvent) &&

            <View style={{ flex: 1, borderColor: 'purple', borderWidth: 2 }}>
              <SpinnerModal
                visible={isConfirmingEvent}
                type="confirming_event"
                isConnected={isConnected}
                onClose={ () => { }}
                // additionalInfo={ `SP share_invite --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
              />
            </View>

        }
        {
          (isEventConfirmed) &&

            <View style={{ flex: 1, borderColor: 'blue', borderWidth: 2 }}>
              <SpinnerModal
                visible={isEventConfirmed}
                type="event_confirmed"
                isConnected={isConnected}
                goBack={goBack}
                onClose={ () => { }}
                additionalInfo={ finalChoices } // eslint-disable-line max-len
              />
            </View>

        }
        {
          (isFinishedUpdatingRsvp) &&

            <View style={{ flex: 1, borderColor: 'lightblue', borderWidth: 2 }}>
              <SpinnerModal
                visible={isFinishedUpdatingRsvp}
                type="rsvp_finished"
                isConnected={isConnected}
                goBack={goBack}
                onClose={ () => { }}
                // additionalInfo={ } // eslint-disable-line max-len
              />
            </View>

        }
        {
          (saveEventStatus === 'Started') &&

            <View style={{ flex: 1, borderColor: 'orange', borderWidth: 2 }}>
              <SpinnerModal
                visible={isLoading}
                type="share_invite"
                isConnected={isConnected}
                onClose={ () => { }}
                // additionalInfo={ `SP share_invite --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
              />
            </View>

        }
        {
          (isLoading) &&

            <View style={{ flex: 1, borderColor: 'blue', borderWidth: 2 }}>
              <SpinnerModal
                visible={isLoading}
                type="loading"
                isConnected={isConnected}
                onClose={ () => { }}
                // additionalInfo={ `SP isLoading --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
              />
            </View>

        }
        {
          (eventCodeError) &&

            <View style={{ flex: 1, borderColor: 'yellow', borderWidth: 2 }}>

              <SpinnerModal
                visible={errorModalVisible}
                type="event_code_error"
                isConnected={isConnected}
                onClose={ () => { }}
                eventCodeError={eventCodeError}
                // additionalInfo={ `SP eventCodeError --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
              />

            </View>
        }

      </View>
    );
  }
}
