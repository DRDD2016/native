import { Share, Platform } from 'react-native';
import Fabric from 'react-native-fabric';

const { Answers } = Fabric;

const android_url = 'https://play.google.com/store/apps/details?id=net.wannaenterprises.spark';
const ios_url = 'http://spark-app.net';


export default function shareApp (firstname, surname) {


  const url = Platform.OS === 'ios' ? ios_url : android_url;

  const text = `${firstname} ${surname} has invited you to use the Spark app to organise and plan social events. Click this link to download the app: ${url}`; // eslint-disable-line max-len

  console.log('shareApp - sharing Link');
  console.log('url: ', url);

  Share.share({
    message: text,
    url,
    title: `${firstname} ${surname} has invited you to use Spark`
  }, {
  // Android only:
    dialogTitle: 'Invite to use Spark',
    // iOS only:
    excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
  });

  Answers.logCustom('App shared', { additionalData: { url, firstname, surname } });
}
