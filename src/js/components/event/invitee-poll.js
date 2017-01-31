
/* eslint-disable no-else-return */
import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import CategoryDetails from './category-details';
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
      });
    } else {
      const selectionIndex = this.state[category].indexOf(selection);
      const newSelection = [...this.state[category]];
      newSelection.splice(selectionIndex, 1);

      this.setState({
        [category]: newSelection
      });
    }
  }

  render () {
    const { event, handleVote } = this.props;

    const allCategoriesSelected = Object.keys(this.state)
      .map(category => this.state[category].length)
      .every(length => length >= 1);

    return (
      <View>
        <Text>POLL (INVITEE VIEW)</Text>
        <View style={styles.row}>
          <CategoryDetails
            category={'what'}
            data={event.what}
            toggleSelection={this.toggleSelection}
          />
        </View>

        <View style={styles.row}>
          <CategoryDetails
            category={'where'}
            data={event.where}
            toggleSelection={this.toggleSelection}
          />
        </View>

        <View style={styles.row}>
          <CategoryDetails
            category={'when'}
            data={event.when}
            toggleSelection={this.toggleSelection}
          />
        </View>
        {
          allCategoriesSelected &&
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={ () => handleVote(this.state, event.event_id) }
          >
            <Text>VOTE</Text>
          </TouchableHighlight>
        }
      </View>
    );
  }
}
