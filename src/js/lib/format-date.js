/* eslint-disable no-param-reassign */
import moment from 'moment';
/**
 * formatDate displays the date in the desired format
 * @param {object} {string} date - date as an ISO 8601 string or an object, with date in DD-MM-YYYY format
 * @param {boolean} {string} full (optional) - indicates if full, half or short date format should be displayed. Defaults to DD MMM if not specified.
 * @returns {string} the date in the specified format, or DD MMM if none specified.
 */

moment.locale('en-gb');

export default function formatDate (date, full) {
  if (typeof date === 'string') {

    if (date === '') {
      return date;
    }
    if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z):TBC/.test(date)) {
      date = date.replace(':TBC', '');
    }
    if (!/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(date)) {
      // if not ISOstring, make ISOstring
      date = moment(date, 'DD-MM-YYYY').toISOString();
    }
  }
  if (typeof date === 'object') {
    // object
    date = moment(date.date, 'DD-MM-YYYY').toISOString();
  }
  if (full === 'half') {
    return moment(date).format('DD MMM YY');
  }
  if (full) {

    return moment(date).format('ddd DD MMMM YYYY');
  }
  return moment(date).format('DD MMM');
}
