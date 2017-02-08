import moment from 'moment';
/**
 * mapToISOString maps moment.js date/time objects to ISO 8601 timestamps
 * @param  {array} array an array of objects
 *                       @param {string} date string representing a date DD MM YYYY
 *                       @param {string} time string representing a given time HH:mm
 * @return {array}       An array of ISO 8601 timestamps
 */
export default function mapToISOString (array) {

  return array.map((obj) => {
    const chosenTimeHours = moment(obj.time, 'HH mm').hour();
    const chosenTimeMins = moment(obj.time, 'HH mm').minute();
    const comboDate = moment(obj.date, 'DD MM YYYY').hour(chosenTimeHours).minute(chosenTimeMins);
    return comboDate.toISOString();
  });
}
