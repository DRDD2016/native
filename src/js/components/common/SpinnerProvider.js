import React, { Component } from 'react';
import { View } from 'react-native';
import SpinnerModal from './SpinnerModal';


export default class SpinnerProvider extends Component {
  componentWillMount () {
    console.log('Spinner props mount: ', this.props);
  }

  componentWillReceiveProps () {
    console.log('Spinner props receive: ', this.props);
  }

  render () {

    const {
      isReceivingFeed,
      isFetchingFeed,
      isConnected,
      eventCodeError,
      isFetchingBranch,
      saveEventStatus,
      isFetchingEvent } = this.props;

    const isLoading = isFetchingBranch || isReceivingFeed || isFetchingFeed || isFetchingEvent;

    const errorModalVisible = () => {
      if (eventCodeError) {
        return true;
      }

      if (!eventCodeError) {
        return false;
      }
    };

    return (
      <View style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
        {
          (saveEventStatus === 'Started') &&

            <View style={{ flex: 1 }}>
              <SpinnerModal
                visible={isLoading}
                type={ 'share_invite' }
                isConnected={isConnected}
                onClose={ () => { this.setState({ isModalVisible: false }); }}
                additionalInfo={ `SP feed share_invite --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
              />
            </View>

        }
        {
          (isLoading) &&

            <View style={{ flex: 1 }}>
              <SpinnerModal
                visible={isLoading}
                type={ 'loading' }
                isConnected={isConnected}
                onClose={ () => { this.setState({ isModalVisible: false }); }}
                additionalInfo={ `SP feed isLoading --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
              />
            </View>

        }
        {
          (eventCodeError) &&

            <View style={{ flex: 1 }}>

              <SpinnerModal
                visible={errorModalVisible}
                type={ 'event_code_error' }
                isConnected={isConnected}
                onClose={ () => { this.setState({ isModalVisible: false }); }}
                eventCodeError={eventCodeError}
                additionalInfo={ `SP feed eventCodeError --- isFetchingBranch:${isFetchingBranch}, isReceivingFeed:${isReceivingFeed}, isFetchingFeed:${isFetchingFeed}, isFetchingEvent:${isFetchingEvent}, isLoading:${isLoading}, isConnected:${isConnected}, saveEventStatus:${saveEventStatus}`} // eslint-disable-line max-len
              />

            </View>
        }

      </View>
    );
  }
}
