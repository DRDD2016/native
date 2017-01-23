import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CategoryDetails from './category-details';
import Button from '../common/Button';
import styles from '../../../styles';


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

    const allCategoriesSelected = Object.keys(this.state)
      .map(category => this.state[category].length)
      .every(length => length === 1);

    return (
      <View>
        <Text>POLL (HOST VIEW)</Text>

        <View style={styles.row}>
          <CategoryDetails
            category={'what'}
            data={event.what}
            toggleSelection={this.toggleSelection}
            vote_count={vote_count}
            userIsHost
          />
        </View>
        <View style={styles.row}>
          <CategoryDetails
            category={'where'}
            data={event.where}
            toggleSelection={this.toggleSelection}
            vote_count={vote_count}
            userIsHost
          />
        </View>
        <View style={styles.row}>
          <CategoryDetails
            category={'when'}
            data={event.when}
            toggleSelection={this.toggleSelection}
            vote_count={vote_count}
            userIsHost
          />
        </View>
        {
          allCategoriesSelected &&
            <Button
              buttonStyle={styles.confirmButton}
              textStyle={styles.confirmButtonText}
              onClick={ () => handleConfirmEvent(this.state, event.event_id) }
            >
              CONFIRM EVENT DETAILS
            </Button>
        }
      </View>
    );
  }
}
