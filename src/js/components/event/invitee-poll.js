
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
      what: what.length > 1 ? new Array(what.length).fill(0) : [1],
      where: where.length > 1 ? new Array(where.length).fill(0) : [1],
      when: when.length > 1 ? new Array(when.length).fill(0) : [1]
    };
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  toggleSelection (category, index) {
    const newArray = this.state[category];
    newArray[index] = parseInt(this.state[category][index], 10) ? 0 : 1;
    this.setState({
      [category]: newArray
    });
  }

  render () {
    const { event, handleVote, voteSaved } = this.props;

    const allCategoriesSelected = Object.keys(this.state)
      .every(category => this.state[category].includes(1));
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

        {
          voteSaved &&
          <Text>Thanks for voting!</Text>
        }
      </View>
    );
  }
}
