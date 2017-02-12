
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
