
/* eslint-disable no-else-return */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CategoryDetails from './category-details';
import Button from '../common/Button';
import styles from '../../../styles';

export default class InviteePoll extends Component {

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
        [category]: this.state[category].concat([selection])
      }, () => {
        console.table(this.state);
      });
    } else {
      const selectionIndex = this.state[category].indexOf(selection);
      const newSelection = [...this.state[category]];
      newSelection.splice(selectionIndex, 1);

      this.setState({
        [category]: newSelection
      }, () => {
        console.table(this.state);
      });
    }
  }

  render () {
    const { event, poll, handleVote, event_id } = this.props;

    const somethingIsSelected = Object.keys(this.state).some((category) => {
      return this.state[category].length > 0;
    });
    return (
      <View>
        <Text>POLL (INVITEE VIEW)</Text>
        <CategoryDetails
          category={'what'}
          data={event._what}
          toggleSelection={this.toggleSelection}
        />

        <CategoryDetails
          category={'where'}
          data={event._where}
          toggleSelection={this.toggleSelection}
        />

        <CategoryDetails
          category={'when'}
          data={event._when}
          toggleSelection={this.toggleSelection}
        />
        {
          somethingIsSelected &&
          <Button
            buttonStyle={styles.buttonStyle}
            onClick={ () => handleVote(poll, event_id) }
          >
            VOTE
          </Button>
        }
      </View>
    );
  }
}
