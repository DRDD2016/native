import moment from 'moment';

/**
 * getEndTime offsets an ISO 8601 date string to 6AM the following day
 * @param {string} date - an ISO 8601 date string
 * @returns {string} an ISO 8601 date string offset at 6AM the following day
 */

export default function getEndTime (date) {
  return moment(date)
        .startOf('day')
        .add(1, 'day')
        .add(6, 'hours')
        .toISOString();
}
