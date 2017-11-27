import { Linking, AsyncStorage } from 'react-native';
import branch, { RegisterViewEvent } from 'react-native-branch';
import { store } from '../init-store';
import { saveIncomingLink, saveIncomingLinkError } from '../actions/network';
import { submitCode } from '../actions/event/data';

/**
 * trimAndReplaceSpaces trim the text and replaces spaces with %20
 * @param {string} text - event name or firstname or surname
 * @returns {string}
 */

function trimAndReplaceSpaces (text) {
  return text.trim().replace(/ /g, '%20');
}

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

export async function composeWhatsAppMessage (user, event, code) {

  const bUO = await branch.createBranchUniversalObject(`invite to event ${code} by ${user}`, {
    // automaticallyListOnSpotlight: true, // ignored on Android
    // canonicalUrl: 'sparksocial://',
    title: event.name,
    contentDescription: `Hi, ${trimAndReplaceSpaces(user.firstname)} ${trimAndReplaceSpaces(user.surname)} has invited you to the event ${trimAndReplaceSpaces(event.name)} on Spark. Open or download the app and enter the following code ${code}`, // eslint-disable-line max-len
    contentImageUrl: user.photo_url,
    contentIndexingMode: 'private', // for Spotlight indexing
    contentMetadata: {
      user,
      eventName: event.name,
      eventCode: code
    }
  });
  bUO.userCompletedAction(RegisterViewEvent);
  console.log('Created Branch Universal Object and logged RegisterViewEvent.');

  const linkProperties = {
    feature: 'shareEventCode',
    channel: 'RNApp'
  };

  const controlParams = {
    // $desktop_url: 'http://spark-app.net',
    // $ios_deepview: 'branch_default',
    $deeplink_path: `sparksocial://Code/${code}`,
    eventCode: `${code}`
  };

  const url = await bUO.generateShortUrl(linkProperties, controlParams);
  console.log('url ', url);

  const text = `Hi, ${trimAndReplaceSpaces(user.firstname)} ${trimAndReplaceSpaces(user.surname)} has invited you to the event ${trimAndReplaceSpaces(event.name)} using Spark. Click this link to RSVP or download the app: ${url.url}`; // eslint-disable-line max-len
  console.log('text ', text);

  return text;
}

export async function openWhatsApp (text) {
  console.log('text2 ', text);

  const url = `whatsapp://send?text=${await text}`;
  Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      console.log(`Can't handle url: ${text}`);
    }
    return Linking.openURL(url);
  }).catch(() => console.log('An error occurred'));
}

export async function subscribeToBranchLinks (navigation) {

  console.info('Subscribing to Branch links');

  await branch.subscribe(async ({ error, params }) => {

    let linkData = 'none';
    if (error) {
      // there was an error. this is a String
      console.info('Error from Branch: ', error);
      linkData = 'none';
      store.dispatch(saveIncomingLinkError(error));
    }
    if (params.eventCode) {
      linkData = params.eventCode;
    } else {
      linkData = 'none';
    }

    console.info('Received link params from Branch');
    console.log('Branch params: ', JSON.stringify(params));

    console.log('saving linkData', linkData);
    store.dispatch(saveIncomingLink(linkData));

    // can we add call to Submit_Code_directly here? remove from Feed?

    AsyncStorage.getItem('spark_token')
    .then((token) => {
      if (token) {
        console.log('submittingCode');
        // dispatch(deleteIncomingLink());
        const code = linkData;
        store.dispatch(submitCode(token, code, navigation));
      }
    })
    .catch(e => console.error(e));

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
