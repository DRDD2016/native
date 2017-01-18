/* eslint-disable */
/* eslint-disable no-else-return */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CategoryDetails from './category-details';
import HostCreateEventButton from './host-create-event-button';
import Button from '../common/Button';
import styles from '../../../styles';

export default class HostPoll extends Component {

  constructor () {
    super();

    this.state = {
      what: [],
      where: [],
      when: []
    };
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  toggleSelection (category, selection) {
    if (!this.state[category].includes(selection)) {
      this.setState({
        [category]: [selection]
      }, () => {
        console.table(this.state);
      });
    } else {
      this.setState({
        [category]: []
      }, () => {
        console.table(this.state);
      });
    }
  }

  render () {

    const { event, vote_count, handleConfirmEvent } = this.props;
    console.log("event", event);
    return (

      <View>
        <Text>POLL (HOST VIEW)</Text>

        <View style={styles.row}>
          <CategoryDetails
            category={'what'}
            data={event._what}
            toggleSelection={this.toggleSelection}
            userIsHost
          />
        </View>
        <View style={styles.row}>
          <CategoryDetails
            category={'where'}
            data={event._where}
            toggleSelection={this.toggleSelection}
            userIsHost
          />
        </View>
        <View style={styles.row}>
          <CategoryDetails
            category={'when'}
            data={event._when}
            toggleSelection={this.toggleSelection}
            userIsHost
          />
        </View>

        <Button
          buttonStyle={styles.confirmButton}
          textStyle={styles.confirmButtonText}
          onClick={ () => handleConfirmEvent(finalChoices, event_id) }
        >
          CONFIRM & SEND INVITES
        </Button>

      </View>
    );
  }
}
