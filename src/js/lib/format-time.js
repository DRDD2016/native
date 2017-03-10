import moment from 'moment';
/**
 * formatTime displays the time in HH:mm format
 * @param {object} {string} time - timestamp as an ISO 8601 string, a modified ISO string (with `:TBC` appended) or an object, with time in HH:mm format
 * @returns {string} the time in HH:mm format
 */
export default function formatTime (time) {
  if (typeof time === 'string') {
    if (time === '') {
      return 'TBC';
    }
    // ISO 8601 string
    if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z):TBC/.test(time)) {
      return 'TBC';
    }
    if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(time)) {

      return moment(time).format('HH:mm');
    }
    // HH:mm string
    return time;
  }
  // object
  return time.time || 'TBC';
}
