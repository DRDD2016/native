import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../common/Button';
import styles from '../../../styles';

class TopBar extends Component {

  cancelEvent () {
    this.props.discardEvent(); //eslint-disable-line
    console.log('go to feed');
  }

  render () {
    const primaryPath = 'feed'; //eslint-disable-line

    return (
      <View style={ styles.topBarContainer }>
        {
          /* feed */
          !this.props.eventID && primaryPath === 'feed' && //eslint-disable-line
          <View style={ styles.rowCentered }>
            <Text style={ styles.title1 }>Feed</Text>
          </View>
        }
        {
        /* /create-event */
        !this.props.eventID && primaryPath === 'eventdetails' && //eslint-disable-line
          <View style={ styles.rowSpaced }>
            <Button
              textStyle={ styles.topBarButtonText }
              onClick={ () => { console.log('back'); }}
            >
              Back
            </Button>
            <Text style={ styles.title1 }>What/Where/When</Text>
            <Button
              textStyle={ styles.topBarButtonText }
              onClick={ () => { this.cancelEvent(); }}
            > Cancel </Button>
          </View>
        }
        {
            /* /invite-friends */
          !this.props.eventID && primaryPath === 'inviteFriends' &&
          <View style={styles.rowSpaced}>
            <Button textStyle={styles.topBarButtonText} onClick={ () => { console.log('back'); } }>
              Back
            </Button>
            <Text style={styles.title1}>
              Invite Friends
            </Text>
            <Button textStyle={styles.topBarButtonText} onClick={ () => { this.cancelEvent(); } }>
              Cancel
            </Button>
          </View>
        }
        {
            /* /confirm-event */
          !this.props.eventID && primaryPath === 'confirm' &&
          <View style={styles.rowSpaced}>
            <Button textStyle={styles.topBarButtonText} onClick={ () => { console.log('back'); }}>
              Back
            </Button>
            <Text style={styles.title1}>
              { primaryPath.charAt(0).toUpperCase() + primaryPath.slice(1) }
            </Text>
            <Button textStyle={styles.topBarButtonText} onClick={ () => { this.cancelEvent(); } }>
              Cancel
            </Button>
          </View>
        }
        {
            /* /calendar */
          !this.props.eventID && primaryPath === 'albums' &&

          <View style={styles.rowCentered}>
            <Text style={styles.title1}>
              { primaryPath.charAt(0).toUpperCase() + primaryPath.slice(1) }
            </Text>
          </View>
        }
        {
            /* /calendar */
          !this.props.eventID && primaryPath === 'calendar' &&

          <View style={styles.rowCentered}>
            <Text style={styles.title1}>
              { primaryPath.charAt(0).toUpperCase() + primaryPath.slice(1) }
            </Text>
            <Button textStyle={ styles.topBarButtonText } />
          </View>
        }

        {
          !this.props.eventID && primaryPath === 'profile' &&
          <View style={styles.rowCentered}>
            <Text style={styles.title1}>Profile</Text>
          </View>
        }
        {
          this.props.eventID && this.props.userIsHost && this.props.isPoll &&
          <View style={styles.rowSpaced}>
            <Text style={styles.title1}>Poll</Text>
          </View>
        }
        {
          this.props.eventID && !this.props.userIsHost && !this.props.isPoll &&
          <View style={styles.rowSpaced}>
            <Text style={styles.title1}>Event</Text>
          </View>
        }
        {
          // User is Invitee and its a Poll
          this.props.eventID && !this.props.userIsHost && this.props.isPoll &&
          <View style={ styles.rowSpaced }>
            <Text style={ styles.title1 }>Poll</Text>
          </View>
        }
        {
          // User is Host and its an Event
          this.props.eventID && this.props.userIsHost && !this.props.isPoll &&
          <View style={styles.rowSpaced}>
            <Button
              textStyle={styles.topBarButtonText}
              onClick={ () => { this.props.handleEdit(this.props.event); } }
              to={ `edit/ ${this.props.eventID}` }
            >
              Edit
            </Button>
            <Text style={styles.title1}>Event</Text>
            <Button textStyle={styles.topBarButtonText} onClick={ this.props.displayCancelModal }>
              Cancel
            </Button>
          </View>
        }
      </View>
    );
  }
}

export default TopBar;
