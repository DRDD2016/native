import React from 'react';
import { View } from 'react-native';
import InviteePoll from './invitee-poll';
import HostPoll from './host-poll';
import Spinner from '../common/Spinner';
import ConfirmedEvent from './confirmed-event';
// import Modal from '../general/modal';
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
    this.props.handleDeleteEvent(this.props.params.event_id);
    this.handleCloseModal();
  }

  handleCloseModal () {
    document.getElementsByClassName('modal-container')[0] // eslint-disable-line no-undef
      .style.display = 'none';
  }

  renderView () {

    if (true) /* this.props.userIsHost && this.props.isPoll */ {
      // changed from this.props.params.event_id
      return (
        <HostPoll
          tally={ this.props.tally }
          event={ this.props.event }
          event_id={ this.props.event.event_id }
          handleConfirmEvent={ this.props.handleConfirmEvent }
        />
      );
    } else if (!this.props.userIsHost && this.props.isPoll) {
      return (
        <InviteePoll
          event={ this.props.event }
          poll={ this.props.poll }
          handleVote={ this.props.handleVote }
          event_id={ this.props.event.event_id }
          isHost={ this.props.userIsHost }
          hasMadeChoice={ this.props.hasMadeChoice }
        />
      );
    } else { // eslint-disable-line no-else-return
      return (
        <ConfirmedEvent
          event={ this.props.event }
          event_id={ this.props.event_id }
          userIsHost={ this.props.userIsHost }
          rsvps={ this.props.rsvps }
          RSVPToEvent={ this.props.RSVPToEvent }
          invitees={ this.props.invitees }
        />
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
          !this.props.isFetching && this.props.event && this.renderView()
        }
      </View>
    );

  }
}


export default Event;

// <Modal deleteEvent={ this.handleDeleteEvent }
//       closeModal={ this.handleCloseModal } />
