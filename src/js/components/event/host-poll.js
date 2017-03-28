import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CategoryDetails from './category-details';
import styles from '../../../styles';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';

const inlineStyle = {
  row: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    minHeight: 40
  }
};

export default class HostPoll extends Component {

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
        [category]: [selection]
      });
    } else {
      this.setState({
        [category]: []
      });
    }
  }

  render () {

    const { event, voteCount, handleConfirmEvent, finalChoices } = this.props;
    const allCategoriesSelected = Object.keys(this.state)
      .map(category => this.state[category].length)
      .every(length => length === 1);
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>You created a Poll</Text>
        </View>

        <View style={ inlineStyle.row }>
          <CategoryDetails
            category={'what'}
            data={event.what}
            toggleSelection={this.toggleSelection}
            voteCount={voteCount && voteCount.what}
            userIsHost
            isHostPollView
          />
        </View>
        <View style={ inlineStyle.row }>
          <CategoryDetails
            category={'where'}
            data={event.where}
            toggleSelection={this.toggleSelection}
            voteCount={voteCount && voteCount.where}
            userIsHost
            isHostPollView
          />
        </View>
        <View style={ inlineStyle.row }>
          <CategoryDetails
            category={'when'}
            data={event.when}
            toggleSelection={this.toggleSelection}
            voteCount={voteCount && voteCount.when}
            userIsHost
            isHostPollView
          />
        </View>
        {
          allCategoriesSelected &&
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={ () => handleConfirmEvent(this.state, event.event_id) }
          >
            <Text style={styles.confirmButtonText}>CONFIRM EVENT DETAILS</Text>
          </TouchableOpacity>
        }
        {
          finalChoices &&
          <View>
            <Text>Your event is now finalised!</Text>
            <Text>What: {finalChoices.what}</Text>
            <Text>Where: {finalChoices.where}</Text>
            <Text>When: {formatDate(finalChoices.when[0])} {formatTime(finalChoices.when[0])}</Text>
          </View>
        }
      </View>
    );
  }
}
