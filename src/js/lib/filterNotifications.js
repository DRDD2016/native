import getUserID from './getUserID';

export default function filterNotifications (notifications, calendarIsFiltered, isHosting) {

  const currentUserID = getUserID();

  if (!calendarIsFiltered) {
    return notifications;
  }
  return notifications.filter((notification) => {

    const hostID = notification.hostID;
    return isHosting ? (hostID === currentUserID) : (hostID !== currentUserID);
  });
}
