import { store } from '../init-store';
/**
 * filterFeed filters feed items according to the user selected filter
 * @param {array} feed - the array of feed / calendar items
 * @param {boolean} filterActive - indicates if any filters are active. True if so, false if not.
 * @param {string} selectedFilter - the current selected filter. Either 'hosting' or 'received'.
 * @returns {array} the array of feed / calendar items filtered by the selected filter
 */

export default function filterFeed (feed, filterActive, selectedFilter) {

  if (!filterActive) {
    return feed;
  }
  const user_id = store.getState().user.user_id;

  return feed.filter((data) => {
    const host_user_id = data.feed_item ?
                          parseInt(data.feed_item.host_user_id, 10) :
                          parseInt(data.host_user_id, 10);
    const userIdsShouldMatch = host_user_id === user_id;
    return selectedFilter === 'hosting' ? userIdsShouldMatch : !userIdsShouldMatch;
  });
}
