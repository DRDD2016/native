import moment from 'moment';

// moment.locale('en-gb');

export default function formatTime (time) {
  if (time === '') {
    return 'TBC';
  }
  if (typeof time === 'string') {
    // ISO 8601 string
    if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z):TBC/.test(time)) {
      return 'TBC';
    }
    if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(time)) {

      return moment(time).format('HH:mm');
    }
    // HH:mm string
    return moment(time, 'HH:mm').format('HH:mm');
  }
  // object
  return time.time ? moment(time.time, 'HH:mm').format('HH:mm') : 'TBC';
}
