/**
 * mapToISOString maps moment.js date/time objects to ISO 8601 timestamps
 * @param  {array} array an array of objects
 *                       @param {object} date moment.js object representing a date at midnight
 *                       @param {object} time a moment.js object representing today at a given time
 * @return {array}       An array of ISO 8601 timestamps
 */

export default function mapToISOString (array) {

  return array.map((obj) => {
    const chosenTimeHours = obj.time.hour();
    const chosenTimeMins = obj.time.minute();
    const comboDate = obj.date.hour(chosenTimeHours).minute(chosenTimeMins);
    return comboDate.toISOString();
  });
}
