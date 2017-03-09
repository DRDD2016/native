import moment from 'moment';

moment.locale('en-gb');

export default function formatDate (date, full) {

  if (date === '') {
    return date;
  }
  if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z):TBC/.test(date)) {
    date = date.replace(':TBC', ''); // eslint-disable-line no-param-reassign
  }
  if (!/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(date)) {

    date = moment(date, 'DD-MM-YYYY'); // eslint-disable-line no-param-reassign
  }
  if (full === 'half') {
    return moment(date).format('DD MMM YY');
  }
  if (full) {

    return moment(date).format('ddd DD MMMM YYYY');
  }
  return moment(date).format('DD MMM');
}
