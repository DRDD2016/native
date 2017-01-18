import moment from 'moment';

moment.locale('en-gb');

export default function formatDate (date, full) {

  if (date === '') {
    return date;
  }
  if (full === 'half') {
    return moment(date).format('DD MMM YY');
  }
  if (full) {

    return moment(date).format('ddd DD MMMM YYYY');
  }
  return moment(date).format('DD MMM');
}
