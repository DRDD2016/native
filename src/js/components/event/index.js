import React from 'react';
import { View } from 'react-native';
import InviteePoll from './invitee-poll';
import HostPoll from './host-poll';
import Spinner from '../common/Spinner';
import EventDetailsHeader from '../general/event-details-header';
import ConfirmedEvent from './confirmed-event';
// import Modal from '../general/modal';
import TopBar from './top-bar';
import DeletedEvent from './deleted-event';
import styles from '../../../styles';


class Event extends React.Component {

  constructor (props) {
    super(props);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  cancelEventConfirmationModal () {
    document.getElementsByClassName('modal-container')[0] // eslint-disable-line no-undef
    .style.display = 'flex';
  }

  handleDeleteEvent () {
    this.props.handleDeleteEvent(this.props.params.eventID);
    this.handleCloseModal();
  }

  handleCloseModal () {
    document.getElementsByClassName('modal-container')[0] // eslint-disable-line no-undef
      .style.display = 'none';
  }

  renderView () {

    if (this.props.userIsHost && this.props.isPoll) {
      // changed from this.props.params.eventID
      return (
        <View>
          <HostPoll
            tally={ this.props.tally }
            event={ this.props.event }
            eventID={ this.props.event.eventID }
            handleHostEventChoices={ this.props.handleHostEventChoices }
            hostEventChoices={ this.props.hostEventChoices }
            handleConfirmEvent={ this.props.handleConfirmEvent }
          />
        </View>
      );
    } else if (!this.props.userIsHost && this.props.isPoll) {
      return (
        <View>
          <View style={styles.container}>
            <InviteePoll
              event={ this.props.event }
              toggleSelection={ this.props.toggleSelection }
              poll={ this.props.poll }
              handlePollConfirmation={ this.props.handlePollConfirmation }
              eventID={ this.props.params.eventID }
              isHost={ this.props.userIsHost }
              hasVoted={ this.props.hasVoted }
            />
          </View>
        </View>
      );
    } else { // eslint-disable-line no-else-return
      return (
        <View>
          <View style={styles.container}>
            <ConfirmedEvent
              event={ this.props.event }
              eventID={ this.props.params.eventID }
              userIsHost={ this.props.userIsHost }
              RSVPs={ this.props.RSVPs }
              RSVPToEvent={ this.props.RSVPToEvent }
              invitees={ this.props.invitees }
              handleUploadPhoto={ this.props.handleUploadPhoto }
              photos={ this.props.photos }
              deletedPhotos={ this.props.deletedPhotos }
              handleDeletePhoto={ this.props.handleDeletePhoto }
              handleSharePhoto={ this.props.handleSharePhoto }
              file={ this.props.file }
              handleSetFile={ this.props.handleSetFile }
              getSelectedPhoto={ this.props.getSelectedPhoto }
              hasPhotoLoaded={ this.props.hasPhotoLoaded }
            />
          </View>
        </View>
      );
    }
  }


  render () {
    return (
      <View>
        {
          this.props.isFetching && <Spinner />
        }

        {
          !this.props.isFetching && (this.props.event === false) && <DeletedEvent />
        }
        {
          !this.props.isFetching && this.props.event &&
          <View>


            <TopBar
              eventID={ this.props.event.eventID }
              userIsHost={ this.props.userIsHost }
              isPoll={ this.props.event.isPoll }
              handleEdit={ this.props.handleEdit }
              location={ this.props.sceneKey }
              displayCancelModal={ this.cancelEventConfirmationModal }
              event={ this.props.event }
            />


            <EventDetailsHeader
              location="Event"
              eventName={ this.props.event.eventName }
              eventDescription={ this.props.event.eventDescription }
              hostPhotoURL={ this.props.event.hostPhotoURL }
              eventID={ this.props.event.eventID }
              isPoll={ this.props.event.isPoll }
              userIsHost={ this.props.event.isHost }
            />
          </View>
        }
        {
          !this.props.isFetching && this.props.event && this.renderView()
        }
      </View>
    );

  }
}


export default Event;

// <Modal deleteEvent={ this.handleDeleteEvent }
//       closeModal={ this.handleCloseModal } />
