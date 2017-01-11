import React from 'react';

export function RSVPUserList (RSVPs, invitees, status) {

  return RSVPs[status].map((id) => {
    const usersWithRSVP = invitees.filter(userObject => id === userObject.id);

    return (
      <div className="twelve columns">
        <div className="ui image label" key={ usersWithRSVP[0].id }>
          <img alt={`${usersWithRSVP[0].firstname}`} src={ usersWithRSVP[0].photo_url } />
          { usersWithRSVP[0].firstname }
        </div>
      </div>
    );
  });
}


export function eventNote (event) {

  return event.eventNode !== '' && (
    <div className="event-note">
      <p className="twelve columns">Message from the host</p>
      <span>{ event.eventNote }</span>
    </div>
  );
}

export function getCurrentTime () {
  return Date.now();
}
