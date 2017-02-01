/**
 * normalisePollData removes unused category keys
 * @param  {object} pollData -  poll object
 * @returns {object} a copy of the poll object with unused categories removed
 */

export default function normalisePollData (pollData) {
  return Object.keys(pollData).reduce((newObj, category) => {
    if (pollData[category].length > 1) {
      newObj[category] = pollData[category];
    }
    return newObj;
  }, {});
}
