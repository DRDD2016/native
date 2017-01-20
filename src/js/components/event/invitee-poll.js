
/* eslint-disable no-else-return */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CategoryDetails from './category-details';
import Button from '../common/Button';
import styles from '../../../styles';

export default class InviteePoll extends Component {

  constructor (props) {
    super(props);

    const { what, where, when } = this.props.event;
    this.state = {
      what: what.length === 1 ? what : [],
      where: where.length === 1 ? where : [],
      when: when.length === 1 ? when : []
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

    const allCategoriesSelected = Object.keys(this.state)
      .map(category => this.state[category].length)
      .every(length => length >= 1);

    return (
      <View>
        <Text>POLL (INVITEE VIEW)</Text>
        <CategoryDetails
          category={'what'}
          data={event.what}
          toggleSelection={this.toggleSelection}
        />

        <CategoryDetails
          category={'where'}
          data={event.where}
          toggleSelection={this.toggleSelection}
        />

        <CategoryDetails
          category={'when'}
          data={event.when}
          toggleSelection={this.toggleSelection}
        />
        {
          allCategoriesSelected &&
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
