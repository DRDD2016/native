import moment from 'moment';

moment.locale('en-gb');

export default function formatTime (time) {
  if (time === '') {
    return time;
  }
  return moment(time, 'HH:mm').format('HH:mm');
}
