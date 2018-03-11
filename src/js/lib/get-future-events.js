import moment from 'moment';
import getEndTime from './get-end-time';

/**
 * getFutureEvents determines if an event's date is in the future
 * @param {object} event - event object
 * @returns {boolean} true if event's date is in the future, false if it is not
 */

export default function getFutureEvents (event) {

  if (event.when[0] === '') {
    return false;
  }
  const eventWhen = event.when[0].split(':TBC');
  const when = eventWhen[0];
  const end = getEndTime(when);
  return moment().toISOString() < end;
}
