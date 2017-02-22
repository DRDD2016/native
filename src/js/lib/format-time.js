import moment from 'moment';

// moment.locale('en-gb');

export default function formatTime (time) {
  if (time === '') {
    return time;
  }
  if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(time)) {

    return moment(time).format('HH:mm');
  }
  return moment(time.time, 'HH:mm').format('HH:mm');
}
