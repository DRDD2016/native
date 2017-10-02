import { Linking } from 'react-native';

/**
 * trimAndReplaceSpaces trim the text and replaces spaces with %20
 * @param {string} text - event name or firstname or surname
 * @returns {string}
 */

function trimAndReplaceSpaces (text) {
  return text.trim().replace(/ /g, '%20');
}

export function composeWhatsAppMessage (user, event, code) {
  return `Hi%21%20${trimAndReplaceSpaces(user.firstname)}%20${trimAndReplaceSpaces(user.surname)}%20has%20invited%20you%20to%20the%20event%20%22${trimAndReplaceSpaces(event.name)}%22%20on%20Spark%2E%20Open%20or%20download%20the%20app%20and%20enter%20the%20following%20code%3A%20${code}`; // eslint-disable-line max-len
}

export function openWhatsApp (text) {
  const url = `whatsapp://send?text=${text}`;
  Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      console.log(`Can't handle url: ${url}`);
    }
    return Linking.openURL(url);
  }).catch(() => console.log('An error occurred')); // put this error into a modal with a OK button and nav if needed
}
