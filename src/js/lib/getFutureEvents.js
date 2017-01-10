import getEndTime from './getEndTime';

export default function getFutureEvents (event) {

  if (event.eventWhen[0].date === '') {
    return false;
  }
  const end = getEndTime(event.eventWhen[0].date);
  return !isNaN(end) && Date.now() < end;
}
