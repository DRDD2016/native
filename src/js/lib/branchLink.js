import { AsyncStorage, Share } from 'react-native';
import branch, { RegisterViewEvent } from 'react-native-branch';
import { store } from '../init-store';
import { subscribeToBranch, linkDatafromBranch, saveIncomingLink, saveIncomingLinkError } from '../actions/network';
import { shareInviteSuccess } from '../actions/create';
import { submitCode } from '../actions/event/data';

/**
 * trimAndReplaceSpaces trim the text and replaces spaces with %20
 * @param {string} text - event name or firstname or surname
 * @returns {string}
 */

// function trimAndReplaceSpaces (text) {
//   return text.trim().replace(/ /g, '%20');
// }

// export function composeBranchLink (user, event, code) {
//
//   let bUO = branch.createBranchUniversalObject(`invite to event ${code} by ${user}`, {
//     // automaticallyListOnSpotlight: true, // ignored on Android
//     // canonicalUrl: this.props.route.url,
//     title: event.name,
//     contentDescription: `Hi%21%20${trimAndReplaceSpaces(user.firstname)}%20${trimAndReplaceSpaces(user.surname)}%20has%20invited%20you%20to%20the%20event%20%22${trimAndReplaceSpaces(event.name)}%22%20on%20Spark%2E%20Open%20or%20download%20the%20app%20and%20enter%20the%20following%20code%3A%20${code}`,
//     contentImageUrl: user.photo_url,
//     contentIndexingMode: 'private', // for Spotlight indexing
//     contentMetadata: {
//       user: user,
//       eventName: event.name,
//       eventCode: code
//     }
//   });
//   bUO.userCompletedAction(RegisterViewEvent)
//   console.log("Created Branch Universal Object and logged RegisterViewEvent.")
//   return bUO;
// }

export async function composeLinkToShare (user, event, code) {

  console.log('branchlink - creating BUO to share');

  // creates the branch Link to share
  let bUO = await branch.createBranchUniversalObject(`invite to event ${code} by ${user}`, {
    // automaticallyListOnSpotlight: true, // ignored on Android
    // canonicalUrl: 'sparksocial://',
    title: `You are invited to ${event.name}`,
    contentDescription: `${user.firstname} ${user.surname} has invited you to this event using Spark. Click this link to RSVP or download the app:`, // eslint-disable-line max-len
    contentImageUrl: user.photo_url,
    contentIndexingMode: 'private' // for Spotlight indexing
    // contentMetadata: {
    //   user,
    //   eventName: event.name,
    //   eventCode: code
    // }
  });
  bUO.userCompletedAction(RegisterViewEvent);
  console.log('Created Branch Universal Object and logged RegisterViewEvent.');

  const linkProperties = {
    feature: 'shareEventCode',
    channel: 'RNApp'
  };

  const controlParams = {
    // $fallback_url: 'http://spark-app.net',
    // $desktop_url: '', // Change the redirect endpoint on desktops
    $android_url: 'https://play.google.com/store/apps/details?id=net.wannaenterprises.spark', // Change the redirect endpoint for Android
    $ios_url: 'http://spark-app.net', // Change the redirect endpoint for iOS
    // $ipad_url: '', // Change the redirect endpoint for iPads
    // $desktop_url: 'http://spark-app.net',
    // $ios_deepview: 'branch_default',
    $uri_redirect_mode: 1, // looks to see if user has app from data and attempts to open app (Facebook messenger, etc);
    $deeplink_path: `sparksocial://Code/${code}`,
    eventCode: `${code}`
  };

  console.log();

  // old openWhatsApp sharing

  // const text = `Hi, ${trimAndReplaceSpaces(user.firstname)} ${trimAndReplaceSpaces(user.surname)} has invited you to the event ${trimAndReplaceSpaces(event.name)} using Spark. Click this link to RSVP or download the app: ${url.url}`; // eslint-disable-line max-len

  // const text = `Hi, ${user.firstname} ${user.surname} has invited you to the event ${event.name} using Spark. Click this link to RSVP or download the app: `; // eslint-disable-line max-len

  // const shareOptions = {
  //   messageHeader: `An invite from ${user.firstname}`,
  //   messageBody: text,
  //   emailSubject: `${user.firstname} ${user.surname} has invited you to ${event.name}`
  // };

  const url = await bUO.generateShortUrl(linkProperties, controlParams);
  const text = `${user.firstname} ${user.surname} has invited you to ${event.name} using Spark. Click this link to RSVP or download the app: ${url.url}`; // eslint-disable-line max-len
  console.log('branchlink - sharing Link');
  Share.share({
    message: text,
    url,
    title: `You are invited to ${event.name}`
  }, {
  // Android only:
    dialogTitle: 'Invite friends using',
    // iOS only:
    excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
  });

  console.log('branchlink - shareInviteSuccess');
  store.dispatch(shareInviteSuccess());

  // const { channel, completed, error } = await bUO.showShareSheet(shareOptions, linkProperties, controlParams);
  //
  // console.log('channel: ', channel);
  // console.log('completed: ', completed);
  // console.log('error: ', error);
  //
  // if (error) {
  //   alert('Error sharing link: ', error);
  // }
  if (bUO) {
    bUO.release();
    bUO = null;
  }

}

// export async function openWhatsApp (text) {
//   console.log('text2 ', text);
//
//   const url = `whatsapp://send?text=${await text}`;
//   Linking.canOpenURL(url).then((supported) => {
//     if (!supported) {
//       console.log(`Can't handle url: ${text}`);
//     }
//     return Linking.openURL(url);
//   }).catch(() => console.log('An error occurred'));
// }


export async function subscribeToBranchLinks (navigation) {

  store.dispatch(subscribeToBranch());

  console.info('Subscribing to Branch links');


  await branch.subscribe(async ({ error, params }) => {

    store.dispatch(subscribeToBranch());

    let linkData = 'none';

    console.info('Received link params from Branch');

    // repeat this to set loading true when new link rec'd when app already open

    console.log('Branch params: ', JSON.stringify(params));

    if (error) {
      // there was an error. this is a String
      console.info('Error from Branch: ', error);
      linkData = 'none';
      store.dispatch(saveIncomingLinkError(error));
      store.dispatch(linkDatafromBranch());
      // return linkData;
    }
    if (params.eventCode) {

      linkData = params.eventCode;

      AsyncStorage.getItem('spark_token')
      .then((token) => {
        if (token) {
          console.log('submittingEventCode');
          // dispatch(deleteIncomingLink());
          const code = linkData;
          store.dispatch(saveIncomingLink(linkData));
          store.dispatch(submitCode(token, code, navigation));
          // store.dispatch(linkDatafromBranch());
          // return linkData;
        }
      })
      .catch(e => console.error(e));

    } else {
      linkData = 'none';
      console.log('saving linkData', linkData);
      store.dispatch(saveIncomingLink(linkData));
      store.dispatch(linkDatafromBranch());
      // return linkData;
    }

    // can we add call to Submit_Code_directly here? remove from Feed?

  });

}

// export async function onShare () {
//   const { channel, completed, error } = await this.buo.showShareSheet({
//     emailSubject: `${trimAndReplaceSpaces(event.name)}`,
//     messageBody: `${trimAndReplaceSpaces(user.firstname)} has invited you to ${trimAndReplaceSpaces(event.name)}.`,
//     messageHeader: `${trimAndReplaceSpaces(event.name)}`
//   }, {
//     feature: 'share',
//     channel: 'RNApp'
//   }, {
//     $desktop_url: 'http://spark-app.net',
//     $ios_deepview: 'branch_default'
//   })
//
//   if (error) {
//     console.error("Error sharing via Branch: " + error)
//     return
//   }
//
//   console.log("Share to " + channel + " completed: " + completed)
// }


// class based component
  // buo = null
  //
  //
  //   this.buo = await branch.createBranchUniversalObject(`invite/`"invite/" + this.props.route.title, {
  //     // automaticallyListOnSpotlight: true, // ignored on Android
  //     canonicalUrl: this.props.route.url,
  //     title: this.props.route.title,
  //     contentImageUrl: this.props.route.image,
  //     contentIndexingMode: 'public' // for Spotlight indexing
  //   })
  //   this.buo.userCompletedAction(RegisterViewEvent)
  //   console.log("Created Branch Universal Object and logged RegisterViewEvent.")
  //
  //
  // componentWillUnmount() {
  //   if (!this.buo) return
  //   this.buo.release()
  // }
  //
  // async onShare() {
  //   let { channel, completed, error } = await this.buo.showShareSheet({
  //     emailSubject: "The Planet " + this.props.route.title,
  //     messageBody: "Read about the planet " + this.props.route.title + ".",
  //     messageHeader: "The Planet " + this.props.route.title
  //   }, {
  //     feature: "share",
  //     channel: "RNApp"
  //   }, {
  //     $desktop_url: this.props.route.url,
  //     $ios_deepview: "branch_default"
  //   })
  //
  //   if (error) {
  //     console.error("Error sharing via Branch: " + error)
  //     return
  //   }
  //
  //   console.log("Share to " + channel + " completed: " + completed)
  // }
