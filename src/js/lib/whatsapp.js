import { Linking } from 'react-native';

/**
 * composeWhatsAppMessage creates a message for use in WhatsApp
 * @param {object} event - event object
 * @param {string} code - event code
 * @returns {string} -  message
 */

export function composeWhatsAppMessage (event, code) {
  console.log(event, code);
  return 'Hello%20from%20Spark!';
}

/**
 * openWhatsApp opens WhatsApp on a user's phone
 * @param  {object} event -  event object
 * @returns {void}
 */

export function openWhatsApp (text) {
  const url = `whatsapp://send?text=${text}`;
  Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      console.error(`Can't handle url: ${url}`);
    }
    return Linking.openURL(url);
  }).catch(err => console.error('An error occurred', err));
}
