import getEndTime from './getEndTime';

export default function getPastEvents (event) {

  if (event.when[0].date === '') {
    return false;
  }
  const end = getEndTime(event.when[0].date);
  return !isNaN(end) && Date.now() > end;
}
