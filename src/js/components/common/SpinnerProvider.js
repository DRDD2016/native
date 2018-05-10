import React, { Component } from 'react';
import { View } from 'react-native';
import SpinnerModal from './SpinnerModal';


export default class SpinnerProvider extends Component {
  // componentWillMount () {
  //   console.log('Spinner props mount: ', this.props);
  // }
  //
  // componentWillReceiveProps () {
  //   console.log('Spinner props receive: ', this.props);
  // }

  render () {

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
      finalChoices } = this.props;

    const isLoading = isFetchingBranch || isReceivingFeed || isFetchingFeed || isFetchingEvent || isFetchingCreate;

    const errorModalVisible = () => {
      if (eventCodeError) {
        return true;
      }

      if (!eventCodeError) {
        return false;
      }
    };

    console.log('isConfirmingEvent:', isConfirmingEvent);
    console.log('isEventConfirmed:', isEventConfirmed);

    return (
      <View style={{ flex: 1, borderColor: 'red', borderWidth: 2 }}>
        {React.Children.only(this.props.children)}
        {
          (isConfirmingEvent) &&

            <View style={{ flex: 1, borderColor: 'purple', borderWidth: 2 }}>
              <SpinnerModal
                visible={isConfirmingEvent}
                type={ 'confirming_event' }
                isConnected={isConnected}
                onClose={ () => { this.setState({ isModalVisible: false }); }}
                // additionalInfo={ `SP share_invite --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
              />
            </View>

        }
        {
          (isEventConfirmed) &&

            <View style={{ flex: 1, borderColor: 'blue', borderWidth: 2 }}>
              <SpinnerModal
                visible={isEventConfirmed}
                type={ 'event_confirmed' }
                isConnected={isConnected}
                onClose={ () => { this.setState({ isModalVisible: false }); }}
                additionalInfo={ finalChoices } // eslint-disable-line max-len
              />
            </View>

        }
        {
          (saveEventStatus === 'Started') &&

            <View style={{ flex: 1, borderColor: 'orange', borderWidth: 2 }}>
              <SpinnerModal
                visible={isLoading}
                type={ 'share_invite' }
                isConnected={isConnected}
                onClose={ () => { this.setState({ isModalVisible: false }); }}
                // additionalInfo={ `SP share_invite --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
              />
            </View>

        }
        {
          (isLoading) &&

            <View style={{ flex: 1, borderColor: 'blue', borderWidth: 2 }}>
              <SpinnerModal
                visible={isLoading}
                type={ 'loading' }
                isConnected={isConnected}
                onClose={ () => { this.setState({ isModalVisible: false }); }}
                // additionalInfo={ `SP isLoading --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
              />
            </View>

        }
        {
          (eventCodeError) &&

            <View style={{ flex: 1, borderColor: 'yellow', borderWidth: 2 }}>

              <SpinnerModal
                visible={errorModalVisible}
                type={ 'event_code_error' }
                isConnected={isConnected}
                onClose={ () => { this.setState({ isModalVisible: false }); }}
                eventCodeError={eventCodeError}
                // additionalInfo={ `SP eventCodeError --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
              />

            </View>
        }

      </View>
    );
  }
}
