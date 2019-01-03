import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import firebase, { Notification } from 'react-native-firebase';
// import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import { savePush } from '../actions/push';
import { store } from '../init-store';


export default class PushController extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount () {

    console.log('checkif User has FCM permissions');
    firebase.messaging().hasPermission()
      .then((enabled) => {
        if (enabled) {
          // user has permissions
        } else {
          // user doesn't have permission
          console.log('requesting permissions');
          firebase.messaging().requestPermission()
            .then(() => {
              // User has authorised
            })
            .catch((error) => {
              // User has rejected permissions
              console.log('error:', error);
            });
        }
      });


    // console.log('requesting permissions');
    // FCM.requestPermissions();

    firebase.messaging().getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          // user has a device token
          AsyncStorage.getItem('spark_token')
          .then((token) => {
            console.log('got Spark token:', token);
            AsyncStorage.getItem('spark_user_id')
            .then((user_id) => {
              console.log('got Spark user_id:', user_id);
              if (token && user_id) {
                console.log('saving PushToken');
                store.dispatch(savePush(token, user_id, fcmToken));
              }
            }).catch(error => console.log(error));
          }).catch(error => console.log(error));
        } else {
          // user doesn't have a device token yet
          console.log('no FCM token');
        }
      });

    // FCM.getFCMToken().then((pushToken) => {
    //   console.log('TOKEN (getFCMToken)', pushToken);
    //   AsyncStorage.getItem('spark_token')
    //   .then((token) => {
    //     console.log('got Spark token:', token);
    //     AsyncStorage.getItem('spark_user_id')
    //     .then((user_id) => {
    //       console.log('got Spark user_id:', user_id);
    //       if (token && user_id) {
    //         console.log('saving PushToken');
    //         store.dispatch(savePush(token, user_id, pushToken));
    //       }
    //     })
    //     .catch(error => console.log(error));
    //   })
    //   .catch(error => console.log(error));
    // });

    // do we need this?
    // if (Platform.OS === 'ios') {
    //   FCM.getAPNSToken().then((pushToken) => {
    //     console.log('APNS TOKEN (getFCMToken)', pushToken);
    //   });
    // }

    // FCM.getInitialNotification().then((notif) => {
    //   console.log('INITIAL NOTIFICATION', notif);
    // });

    // new Firebase
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
        // Process your notification as required
        if (notification) {
          return;
        }
        console.log('no notification');
    });


      // this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
      //   console.log('Notification', notif);
      //   if (notif.local_notification) {
      //     return;
      //   }
      //   if (notif.opened_from_tray) {
      //     return;
      //   }
      //
      //   if (Platform.OS === 'ios') {
      //     // optional
      //     // iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
      //     // This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
      //     // notif._notificationType is available for iOS platfrom
      //     switch (notif._notificationType) {
      //       case NotificationType.Remote:
      //         notif.finish(RemoteNotificationResult.NewData); // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
      //         break;
      //       case NotificationType.NotificationResponse:
      //         notif.finish();
      //         break;
      //       case NotificationType.WillPresent:
      //         notif.finish(WillPresentNotificationResult.All); // other types available: WillPresentNotificationResult.None
      //         break;
      //       default:
      //         return;
      //     }
      //   }
      //
      //   this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (pushToken) => {
      //     console.log('TOKEN (refreshedToken: )', pushToken);
      //   }); // might need to move or bind this for componentWillUnmount to recognise
      //
      // });
  }

  componentWillUnmount () {
    // if (Platform.OS === 'ios') {
    //   this.refreshTokenListener.remove();
    // }
    // this.notificationListener.remove();
    this.notificationListener();

  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
      </View>
    );
  }

}
