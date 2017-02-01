/**
 * normaliseVoteData removes unused category keys
 * @param  {object} voteData -  vote object
 * @returns {object} a copy of the vote object with unused categories removed
 */

export default function normaliseVoteData (voteData) {
  return Object.keys(voteData).reduce((newObj, category) => {
    if (voteData[category].length > 1) {
      newObj[category] = voteData[category];
    }
    return newObj;
  }, {});
}
