import { AsyncStorage, Share, Platform } from 'react-native';
import branch, { RegisterViewEvent } from 'react-native-branch';
import Fabric from 'react-native-fabric';
import { store } from '../init-store';
import { subscribeToBranch, linkDatafromBranch, saveIncomingLink, saveIncomingLinkError } from '../actions/network';
import { shareInviteSuccess } from '../actions/create';
import { submitCode } from '../actions/event/data';

const { Answers } = Fabric;

const android_url = 'https://play.google.com/store/apps/details?id=net.wannaenterprises.spark';
const ios_url = 'http://spark-app.net';

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
  console.log('event: ', event);
  console.log('code: ', code);

  let bUO = '';
  // creates the branch Link to share

  const title = event === undefined
    ? `${user.firstname} ${user.surname} has invited you to use Spark`
    : `You are invited to ${event.name}`;

  console.log('title: ', title);
  if (event === undefined) {

    // create shareApp link if event args are undefined

    const url = Platform.OS === 'ios' ? ios_url : android_url;

    bUO = await branch.createBranchUniversalObject(`invite to use Spark by ${user}`, {
      title,
      contentDescription: `${user.firstname} ${user.surname} has invited you to use the Spark app to organise and plan social events. Click this link to download the app: ${url}`, // eslint-disable-line max-len
      contentImageUrl: user.photo_url,
      contentIndexingMode: 'private' // for Spotlight indexing
    });
  } else {

    // create event link if event args are undefined

    bUO = await branch.createBranchUniversalObject(`invite to event ${code} by ${user}`, {
      // automaticallyListOnSpotlight: true, // ignored on Android
      // canonicalUrl: 'sparksocial://',
      title,
      contentDescription: `${user.firstname} ${user.surname} has invited you to this event using Spark. Click this link to RSVP or download the app:`, // eslint-disable-line max-len
      contentImageUrl: user.photo_url,
      contentIndexingMode: 'private' // for Spotlight indexing
      // contentMetadata: {
      //   user,
      //   eventName: event.name,
      //   eventCode: code
      // }
    });
  }

  bUO.userCompletedAction(RegisterViewEvent);
  console.log('Created Branch Universal Object and logged RegisterViewEvent.');

  let linkProperties = '';
  let controlParams = '';

  if (event === undefined) {
    linkProperties = {
      feature: 'shareApp',
      channel: 'RNApp'
    };
    controlParams = {
      // $fallback_url: 'http://spark-app.net',
      // $desktop_url: '', // Change the redirect endpoint on desktops
      $android_url: 'https://play.google.com/store/apps/details?id=net.wannaenterprises.spark', // Change the redirect endpoint for Android
      $ios_url: 'http://spark-app.net', // Change the redirect endpoint for iOS
      // $ipad_url: '', // Change the redirect endpoint for iPads
      // $desktop_url: 'http://spark-app.net',
      // $ios_deepview: 'branch_default',
      $uri_redirect_mode: 1 // looks to see if user has app from data and attempts to open app (Facebook messenger, etc); set to 2 if iOS 11.2 issues
      // $deeplink_path: `sparksocial://Code/${code}`,
      // eventCode: `${code}`
    };
  } else {
    linkProperties = {
      feature: 'shareEventCode',
      channel: 'RNApp'
    };
    controlParams = {
      // $fallback_url: 'http://spark-app.net',
      // $desktop_url: '', // Change the redirect endpoint on desktops
      $android_url: 'https://play.google.com/store/apps/details?id=net.wannaenterprises.spark', // Change the redirect endpoint for Android
      $ios_url: 'http://spark-app.net', // Change the redirect endpoint for iOS
      // $ipad_url: '', // Change the redirect endpoint for iPads
      // $desktop_url: 'http://spark-app.net',
      // $ios_deepview: 'branch_default',
      $uri_redirect_mode: 1, // looks to see if user has app from data and attempts to open app (Facebook messenger, etc); set to 2 if iOS 11.2 issues
      $deeplink_path: `sparksocial://Code/${code}`,
      eventCode: `${code}`
    };
  }

  // old openWhatsApp sharing

  // const text = `Hi, ${trimAndReplaceSpaces(user.firstname)} ${trimAndReplaceSpaces(user.surname)} has invited you to the event ${trimAndReplaceSpaces(event.name)} using Spark. Click this link to RSVP or download the app: ${url.url}`; // eslint-disable-line max-len

  // const text = `Hi, ${user.firstname} ${user.surname} has invited you to the event ${event.name} using Spark. Click this link to RSVP or download the app: `; // eslint-disable-line max-len

  // const shareOptions = {
  //   messageHeader: `An invite from ${user.firstname}`,
  //   messageBody: text,
  //   emailSubject: `${user.firstname} ${user.surname} has invited you to ${event.name}`
  // };

  const shortURL = await bUO.generateShortUrl(linkProperties, controlParams);
  const url = shortURL.url;
  console.log('shortURL:', shortURL);
  console.log('url:', url);

  const text = event === undefined
    ? `${user.firstname} ${user.surname} has invited you to use the Spark app to organise and plan social events. Click this link to download the app: ${url}` // eslint-disable-line max-len
    : `${user.firstname} ${user.surname} has invited you to ${event.name} using Spark. Click this link to RSVP or download the app: ${url}`; // eslint-disable-line max-len

  const dialogTitle = event === undefined
    ? 'Invite friends to use Spark'
    : 'Invite friends using';

  console.log('branchlink - sharing Link');
  console.log('text: ', text);
  console.log('url: ', url);
  console.log('title: ', title);

  Share.share({
    message: text,
    url,
    title
  }, {
  // Android only:
    dialogTitle,
    // iOS only:
    excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
  });

  console.log('branchlink - shareInviteSuccess');
  store.dispatch(shareInviteSuccess());

  if (event === undefined) {
    Answers.logCustom('App shared', { additionalData: url });
  } else {
    Answers.logCustom('Invite shared', { additionalData: url });
  }


  // if use branch sharesheet, can add an Answers Event to track which channels are shared via.
  // check if this works for both android and IOS
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

    // new

    if (error) {
      // there was an error. this is a String
      console.info('Error from Branch: ', error);
      linkData = 'none';
      store.dispatch(saveIncomingLinkError(error));
      store.dispatch(linkDatafromBranch());
      Answers.logCustom(`branchLink.js error from Branch: ${error}`, { additionalData: 'nothing' });
      // return linkData;
    }

    // params will never be null if error is null

    if (params['+non_branch_link']) {
      const nonBranchUrl = params['+non_branch_link'];
      console.log('nonBranchUrl', nonBranchUrl);
      Answers.logCustom(`branchLink.js non_branch_link: ${params}`, { additionalData: 'nothing' });

      linkData = 'none'; // replace with last string code

      store.dispatch(saveIncomingLink(linkData));
      store.dispatch(linkDatafromBranch());
      // Route non-Branch URL if appropriate.
      return;
    }

    if (!params['+clicked_branch_link']) {
      // Indicates initialization success and some other conditions.
      // No link was opened.

      linkData = 'none';
      console.log('No link opened, linkData: ', linkData);
      store.dispatch(saveIncomingLink(linkData));
      store.dispatch(linkDatafromBranch());

      Answers.logCustom('branchLink.js !params +clicked_branch_link', { additionalData: 'nothing' });

      return;
    }

    // A Branch link was opened.
    // Route link based on data in params.

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
          // store.dispatch(linkDatafromBranch()); // dont do this until loading finished on Feed
          // return linkData;
          Answers.logCustom(`branchLink.js branch eventCode: ${params}`, { additionalData: 'nothing' });

        }
      })
      .catch(e => console.error(e));

    } else {
      linkData = 'none';
      console.log('saving linkData', linkData);
      store.dispatch(saveIncomingLink(linkData));
      store.dispatch(linkDatafromBranch());
      Answers.logCustom('branchLink.js branch else linkcode none', { additionalData: 'nothing' });

      // return linkData;
    }

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
