import moment from 'moment';

moment.locale('en-gb');

export default function formatDate (date) {
  if (date === '') {
    return date;
  }
  return moment(date).format('ddd DD MMMM YYYY');
}
