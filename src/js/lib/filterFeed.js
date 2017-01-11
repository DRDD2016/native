import getUserID from './getUserID';

export default function filterFeed (feed, calendarIsFiltered, isHosting) {

  const currentUserID = getUserID();

  if (!calendarIsFiltered) {
    return feed;
  }
  return feed.filter((feedItem) => {

    const hostID = feedItem.hostID;
    return isHosting ? (hostID === currentUserID) : (hostID !== currentUserID);
  });
}
