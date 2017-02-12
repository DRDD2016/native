/**
 * filterFeed filters feed items according to the user selected filter
 * @param {array} feed - the array of feed items
 * @param {boolean} filterActive - indicates if any filters are active. True if so, false if not.
 * @param {string} selectedFilter - the current selected filter. Either 'hosting' or 'received'.
 * @returns {array} the array of feed items filtered by the selected filter
 */

const user_id = 1;
export default function filterFeed (feed, filterActive, selectedFilter) {

  if (!filterActive) {
    return feed;
  }
  return feed.filter((feedItem) => {
    const host_user_id = parseInt(feedItem.host_user_id, 10);
    return selectedFilter === 'hosting' ? (host_user_id === user_id) : (host_user_id !== user_id);
  });
}
