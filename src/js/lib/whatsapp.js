import { Linking } from 'react-native';

export function composeWhatsAppMessage (user, event, code) {
  const trimmed = event.name.trim();
  const hasSpace = /\s/g.test(trimmed);
  const eventName = hasSpace ? trimmed.replace(/ /g, '%20') : trimmed;
  return `Hi%21%20${user.firstname}%20${user.surname}%20has%20invited%20you%20to%20the%20event%20%22${eventName}%22%20on%20Spark%2E%20Open%20or%20download%20the%20app%20and%20enter%20the%20following%20code%3A%20${code}`; // eslint-disable-line max-len
}

export function openWhatsApp (text) {
  const url = `whatsapp://send?text=${text}`;
  Linking.canOpenURL(url).then((supported) => { // eslint-disable-line no-unused-vars
    // if (!supported) {
    //   console.error(`Can't handle url: ${url}`);
    // }
    return Linking.openURL(url);
  }).catch(err => console.error('An error occurred', err));
}
